using System;
using System.Collections.Generic;
using System.Linq;
using lg.blog.api.entities;
using Microsoft.Extensions.Caching.Memory;

namespace lg.blog.api.repositories
{
    public class InMemoryBlogPostRepository : IBlogPostRepository
    {
        private readonly IMemoryCache _memoryCache;
        private const string BLOG_POSTS_KEY = "blogpost-collection";

        public InMemoryBlogPostRepository(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
            InitializeCache();
        }

        private void InitializeCache()
        {
            _memoryCache.Set(BLOG_POSTS_KEY, new List<BlogPost>{
                new BlogPost {
                    Id = Guid.NewGuid(),
                    CreateDate = DateTime.Now.AddDays(-10),
                    Title = "Don't you see how great this is?",
                    Content = @"You, you are a... Jesse look at me. You... are a blowfish. A blowfish! Think about it. Small in stature, not swift, not cunning. Easy prey for predators but the blowfish has a secret weapon doesn't he. Doesn't he? What does the blowfish do, Jesse. What does the blowfish do? The blowfish puffs up, okay?
                        The blowfish puffs himself up four, five times larger than normal and why? Why does he do that? So that it makes him intimidating, that's why. Intimidating! So that the other, scarier fish are scared off. And that's you! You are a blowfish. You see it's just all an illusion. You see it's... it's nothing but air. Now... who messes with the blowfish, Jesse? You're damn right. You are a blowfish. Say it again. Say it like you mean it. You're a BLOWFISH! 
                        My partner was about to get himself shot. I intervened. He was angry because those two dealers of yours had just murdered an eleven year-old boy. Then again, maybe he thought it was you who gave the order. 
                        He has enough money to last forever. He knows he needs to keep moving. You'll never find him. He's out of the picture. I saved his life, I owed him that, but now he and I are done. Which is exactly what you wanted, isn't it. You've always struck me as a very pragmatic man so if I may, I would like to review options with you. Of which, it seems to me you have two. "
                },
                new BlogPost {
                    Id = Guid.NewGuid(),
                    CreateDate = DateTime.Now.AddDays(-5),
                    Title = "No speeches. Short speech",
                    Content = @"YYou lost your partner today. What's his name - Emilio? Emilio is going to prison. The DEA took all your money, your lab. You got nothing. Square one. But you know the business and I know the chemistry. I'm thinking... maybe you and I could partner up. 
                        I'm sorry, what were you asking me? Oh, yes, that stupid plastic container I asked you to buy. You see, hydrofluoric acid won't eat through plastic. It will, however, dissolve metal, rock, glass, ceramic. So there's that. How about something with some protein, maybe? Something green, huh? How are you even alive? 
                        That is seventeen five - your half of the thirty-five thousand. Plus there's an extra fifteen in there, it's all yours, you've earned it. We made a deal. That's right. Because I think that we can do business together - we came to an understanding. Take a look at the money in your hand. Now just imagine making that every week. That's right. Two pounds a week, thirty-five thousand a pound. 
                        Look... I feel like I'm running out of ways to explain this to you but once more, I shall try. This fly is a major problem for us. It will ruin our batch. And we need to destroy it and every trace of it, so we can cook. Failing that, we're dead. There's no more room for error. Not with these people."
                },
                new BlogPost {
                    Id = Guid.NewGuid(),
                    CreateDate = DateTime.Now.AddDays(-1),
                    Title = "In one stroke, he bloodied both sides ",
                    Content = @"set the American and Mexican governments against the Cartel, and cut off the supply of methamphetamine to the southwest. If this man had his own source of product on this side of the border, he would have the market to himself. The rewards would be... enormous.
                        We're both adults. I can't pretend I don't know that person is you. I want there to be no confusion. I know I owe you my life. And more than that, I respect the strategy. In your position, I would have done the same. One issue, which troubles me, I don't know what happens when our three-month contract ends. You know why I do this. I want security for my family.
                        No speeches. Short speech. You lost your partner today. What's his name - Emilio? Emilio is going to prison. The DEA took all your money, your lab. You got nothing. Square one. But you know the business and I know the chemistry. I'm thinking... maybe you and I could partner up. 
                        I'm sorry, what were you asking me? Oh, yes, that stupid plastic container I asked you to buy. You see, hydrofluoric acid won't eat through plastic. It will, however, dissolve metal, rock, glass, ceramic. So there's that. How about something with some protein, maybe? Something green, huh? How are you even alive?"
                }
            });
        }

        public IEnumerable<BlogPost> load(int limit, int offset)
        {
            var blogPosts = new List<BlogPost>();
            _memoryCache.TryGetValue(BLOG_POSTS_KEY, out blogPosts);
            return blogPosts.Skip(offset).Take(limit);
        }
    }
}