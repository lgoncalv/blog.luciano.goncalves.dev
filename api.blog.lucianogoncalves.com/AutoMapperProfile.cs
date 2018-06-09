using AutoMapper;
using lg.blog.api.entities;
using lg.blog.api.models;

namespace lg.blog.api
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<BlogPost, BlogPostModel>().ReverseMap();
        }
    }
}