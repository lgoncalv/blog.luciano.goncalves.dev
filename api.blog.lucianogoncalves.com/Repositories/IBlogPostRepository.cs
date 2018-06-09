using System;
using System.Collections.Generic;
using lg.blog.api.entities;

namespace lg.blog.api.repositories
{
    public interface IBlogPostRepository
    {
        IEnumerable<BlogPost> load(int limit, int offset);
    }
}