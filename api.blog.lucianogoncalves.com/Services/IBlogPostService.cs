using System;
using System.Collections.Generic;
using lg.blog.api.models;

namespace lg.blog.api.services
{
    public interface IBlogPostService
    {
        IEnumerable<BlogPostModel> GetBlogPosts();
        IEnumerable<BlogPostModel> GetBlogPosts(int limit, int offset);
    }
}