import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from "body-parser";
import { Post } from './post';

admin.initializeApp();
const db = admin.firestore();

const app = express();
const main = express();

main.use('/v1', app);
main.use(bodyParser.json());

const whitelist = ['http://localhost:4200']
const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

export const api = functions.https.onRequest(main);

app.get('/posts', cors(corsOptions), async (request, response) => {
    try {
        db.collection('posts').get().then(snapshot => {
            const posts: Post[] = [];
            snapshot.forEach(post => {
                posts.push({
                    id: post.id, 
                    title: post.get('title'), 
                    slug: post.get('slug'), 
                    summary: post.get('summary'), 
                    content: post.get('content'),
                    createdOn: post.get('createdOn').seconds
                })
            })
            response.status(200).json(posts);
        }).catch(error => {
            throw error;
        });
    } catch(error) {
        console.error(error);
        response.status(500).send('Something went wrong :(');
    }
});

app.get('/posts/slug/:slug', cors(corsOptions), async (request, response) => {
    try {
        const slug = request.params.slug;
        if (!slug) throw new Error('Slug is required');

        db.collection('posts')
        .where('slug', '==', slug)
        .get()
        .then(snapshot => {
            if (!snapshot.empty) {
                const post = snapshot.docs[0];
                response.status(200).json({
                    id: post.id, 
                    title: post.get('title'), 
                    slug: post.get('slug'), 
                    summary: post.get('summary'), 
                    content: post.get('content'),
                    createdOn: post.get('createdOn').seconds
                });
            } else {
                response.status(404).send();
            }
        }).catch(error => {
            throw error;
        })
    } catch(error) {
        console.error(error);
        response.status(500).send('Something went wrong :(');
    }
});
