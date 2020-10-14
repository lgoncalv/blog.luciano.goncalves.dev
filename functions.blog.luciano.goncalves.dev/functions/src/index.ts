import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from "body-parser";
import * as moment from "moment";
import { Post, PostSummary, PostDraftSummary } from './post';
import { Timestamp } from '@google-cloud/firestore';

admin.initializeApp();
const db = admin.firestore();

const app = express();
const main = express();

main.use('/v1', app);
main.use(bodyParser.json());

const whitelist = ['http://localhost:4200', 'https://blog.luciano.goncalves.dev']
const corsOptions = {
    origin: (origin: any, callback: any) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

const validateFirebaseIdToken = async (req: any, res: any, next: any) => {
    console.log('Check if request is authorized with Firebase ID token');

    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
        !(req.cookies && req.cookies.__session)) {
        console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
            'Make sure you authorize your request by providing the following HTTP header:',
            'Authorization: Bearer <Firebase ID Token>',
            'or by passing a "__session" cookie.');
        res.status(403).send('Unauthorized');
        return;
    }

    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        console.log('Found "Authorization" header');
        // Read the ID Token from the Authorization header.
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else if (req.cookies) {
        console.log('Found "__session" cookie');
        // Read the ID Token from cookie.
        idToken = req.cookies.__session;
    } else {
        // No cookie
        res.status(403).send('Unauthorized');
        return;
    }

    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        console.log('ID Token correctly decoded', decodedIdToken);
        req.user = decodedIdToken;
        next();
        return;
    } catch (error) {
        console.error('Error while verifying Firebase ID token:', error);
        res.status(403).send('Unauthorized');
        return;
    }
};

export const api = functions.https.onRequest(main);

app.use(cors(corsOptions));

app.get('/posts', async (request, response) => {
    try {
        db.collection('posts')
            .where('published', '==', true)
            .orderBy('publishedOn', 'desc')
            .get()
            .then(snapshot => {
                const posts: PostSummary[] = [];
                snapshot.forEach(post => {
                    posts.push({
                        title: post.get('title'),
                        slug: post.get('slug'),
                        content: post.get('summary'),
                        publishedOn: post.get('publishedOn').seconds
                    })
                })
                response.status(200).json(posts);
            }).catch(error => {
                throw error;
            });
    } catch (error) {
        console.error(error);
        response.status(500).send('Something went wrong :(');
    }
});

app.get('/posts/drafts', validateFirebaseIdToken, async (request, response) => {
    try {
        db.collection('posts')
            .where('published', '==', false)
            .orderBy('createdOn', 'asc')
            .get()
            .then(snapshot => {
                const summaries: PostDraftSummary[] = [];
                snapshot.forEach(post => {
                    summaries.push({
                        id: post.id,
                        title: post.get('title'),
                        createdOn: post.get('createdOn').seconds
                    })
                })
                response.status(200).json(summaries);
            }).catch(error => {
                throw error;
            });
    } catch (error) {
        console.error(error);
        response.status(500).send('Something went wrong :(');
    }
});

app.get('/posts/:id', validateFirebaseIdToken, async (request, response) => {
    try {
        const id = request.params.id;
        if (!id) throw new Error('Id is required');

        db.collection('posts')
            .doc(id)
            .get()
            .then(snapshot => {
                if (snapshot.exists) {
                    const post = <Post>snapshot.data();
                    response.status(200).json({
                        ...post,
                        id: id,
                        publishedOn: post.publishedOn ? (<Timestamp>post.publishedOn).seconds : undefined,
                        createdOn: (<Timestamp>post.createdOn).seconds,
                        updatedOn: post.updatedOn ? (<Timestamp>post.updatedOn).seconds : undefined
                    });
                } else {
                    response.status(404).send();
                }
            }).catch(error => {
                throw error;
            })
    } catch (error) {
        console.error(error);
        response.status(500).send('Something went wrong :(');
    }
});

app.delete('/posts/:id', validateFirebaseIdToken, async (request, response) => {
    try {
        const id = request.params.id;
        if (!id) throw new Error('Id is required');

        db.collection('posts')
            .doc(id)
            .delete()
            .then(_ => {
                response.status(204).send();
                
            }).catch(error => {
                throw error;
            })
    } catch (error) {
        console.error(error);
        response.status(500).send('Something went wrong :(');
    }
});

app.get('/posts/slug/:slug', async (request, response) => {
    try {
        const slug = request.params.slug;
        if (!slug) throw new Error('Slug is required');

        db.collection('posts')
            .where('published', '==', true)
            .where('slug', '==', slug)
            .get()
            .then(snapshot => {
                if (!snapshot.empty) {
                    const post = snapshot.docs[0];
                    response.status(200).json({
                        id: post.id,
                        title: post.get('title'),
                        slug: post.get('slug'),
                        content: post.get('content') ? post.get('content') : post.get('summary'),
                        publishedOn: post.get('publishedOn').seconds
                    });
                } else {
                    response.status(404).send();
                }
            }).catch(error => {
                throw error;
            })
    } catch (error) {
        console.error(error);
        response.status(500).send('Something went wrong :(');
    }
});

app.put('/posts', validateFirebaseIdToken, async (request, response) => {
    try {
        const post = <Post>request.body;
        db.collection('posts')
            .doc(post.id!)
            .get()
            .then(snapshot => {
                if (!snapshot.exists) {
                    response.status(404).send();
                    return;
                }
                const currentPost = <Post>snapshot.data();
                const updatedPost: Post = {
                    ...currentPost,
                    updatedOn: admin.firestore.Timestamp.fromMillis(moment.unix(<number>post.updatedOn).utc().valueOf()),
                };

                if (currentPost.published !== post.published) {
                    updatedPost.published = post.published;
                    updatedPost.publishedOn = post.publishedOn 
                        ? admin.firestore.Timestamp.fromMillis(moment.unix(<number>post.publishedOn).utc().valueOf()) 
                        : currentPost.publishedOn;
                }

                if (currentPost.content !== post.content && post.content) {
                    updatedPost.content = post.content;
                }

                if (currentPost.title !== post.title) {
                    updatedPost.title = post.title;
                    if (!currentPost.published)
                        updatedPost.slug = slugify(post.title);
                }

                if (currentPost.summary !== post.summary && post.summary) {
                    updatedPost.summary = post.summary;
                }

                db.collection('posts').doc(post.id!)
                    .update(updatedPost)
                    .then(() => {
                        response.status(200).send({
                            published: updatedPost.published,
                            slug: updatedPost.slug
                        });
                    }).catch(error => {
                        console.error("Error updating document: ", error);
                        response.status(500).send();
                    })
            }).catch(error => {
                console.error("Error getting document: ", error);
                response.status(500).send();
            });
    } catch (error) {
        console.error(error);
        response.status(500).send('Something went wrong :(');
    }
});

app.post('/posts', validateFirebaseIdToken, async (request, response) => {
    try {
        const post: Post = {
            ...request.body,
            updatedOn: admin.firestore.Timestamp.fromMillis(moment.unix(<number>request.body.updatedOn).utc().valueOf()),
            createdOn: admin.firestore.Timestamp.fromMillis(moment.unix(<number>request.body.createdOn).utc().valueOf()),
            slug: slugify(request.body.title)
        }

        if (request.body.publishedOn) {
            post.publishedOn = admin.firestore.Timestamp.fromMillis(moment.unix(request.body.publishedOn).utc().valueOf());
        }

        const { id, ...noId } = post;

        db.collection('posts').add(noId)
            .then(() => {
                response.status(201).json({
                    slug: noId.slug,
                    published: noId.published
                });
            })
            .catch(error => {
                console.error("Error adding document: ", error);
                response.status(500).send();
            });
    } catch (error) {
        console.error(error);
        response.status(500).send('Something went wrong :(');
    }
});

function slugify(string: string): string {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return string.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}