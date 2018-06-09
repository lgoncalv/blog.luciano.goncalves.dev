using System.Collections.Generic;
using AutoMapper;
using lg.blog.api.models;
using lg.blog.api.repositories;

namespace lg.blog.api.services
{
    public class BlogPostService : IBlogPostService
    {
        private readonly IBlogPostRepository _blogPostRepository;
        private readonly IMapper _mapper;

        public BlogPostService(IBlogPostRepository blogPostRepository, IMapper mapper)
        {
            _blogPostRepository = blogPostRepository;
            _mapper = mapper;
        }
        
        public IEnumerable<BlogPostModel> GetBlogPosts()
        {
            var blogPosts = _blogPostRepository.load(Consts.LIMIT_GET_POST_QUANTITY, 0);
            return _mapper.Map<IEnumerable<BlogPostModel>>(blogPosts);
        }

        public IEnumerable<BlogPostModel> GetBlogPosts(int limit, int offset)
        {
            var blogPosts = _blogPostRepository.load(limit, offset);
            return _mapper.Map<IEnumerable<BlogPostModel>>(blogPosts);
        }
    }
}