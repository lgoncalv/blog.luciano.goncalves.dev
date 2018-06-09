using System;

namespace lg.blog.api.entities
{
    public class BlogPost
    {
        public Guid Id { get; set; }
        public DateTime CreateDate { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}