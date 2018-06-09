using System;

namespace lg.blog.api.models
{
    public class BlogPostModel
    {
        public Guid Id { get; set; }
        public string CreateDate { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}