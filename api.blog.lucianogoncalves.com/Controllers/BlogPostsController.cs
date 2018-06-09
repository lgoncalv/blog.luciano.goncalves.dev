using System;
using lg.blog.api.models;
using lg.blog.api.repositories;
using lg.blog.api.services;
using Microsoft.AspNetCore.Mvc;

namespace lg.blog.api.controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostsController : ControllerBase
    {
        private readonly IBlogPostService _blogPostService;
        public BlogPostsController(IBlogPostService blogPostService)
        {
            _blogPostService = blogPostService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var blogPosts = _blogPostService.GetBlogPosts();
            return Ok(blogPosts);
        }
    }
}