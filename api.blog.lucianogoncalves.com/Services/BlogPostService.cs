using System.Collections.Generic;
using AutoMapper;
using lg.blog.api.models;
using lg.blog.api.repositories;
using Microsoft.Extensions.Logging;

namespace lg.blog.api.services
{
    public class BlogPostService : IBlogPostService
    {
        private readonly IBlogPostRepository _blogPostRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<BlogPostService> _logger;

        public BlogPostService(IBlogPostRepository blogPostRepository,
            IMapper mapper, ILogger<BlogPostService> logger)
        {
            _blogPostRepository = blogPostRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public IEnumerable<BlogPostModel> GetBlogPosts()
        {
            _logger.LogInformation("Get posts from 0 to {limit}", Consts.LIMIT_GET_POST_QUANTITY);
            var blogPosts = _blogPostRepository.load(Consts.LIMIT_GET_POST_QUANTITY, 0);
            return _mapper.Map<IEnumerable<BlogPostModel>>(blogPosts);
        }

        public IEnumerable<BlogPostModel> GetBlogPosts(int limit, int offset)
        {
            _logger.LogInformation("Get posts from {from} to {to}", offset, offset + Consts.LIMIT_GET_POST_QUANTITY);
            var blogPosts = _blogPostRepository.load(limit, offset);
            return _mapper.Map<IEnumerable<BlogPostModel>>(blogPosts);
        }
    }
}