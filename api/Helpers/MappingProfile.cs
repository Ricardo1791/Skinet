using api.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;

namespace api.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Product,ProductToReturnDto>()
                .ForMember(x => x.ProductBrand, y => y.MapFrom(s => s.ProductBrand.Name))
                .ForMember(x => x.ProductType, y => y.MapFrom(s => s.ProductType.Name))
                .ForMember(x => x.PictureUrl, y => y.MapFrom<ProductUrlResolver>());

            CreateMap<Address, AddressDto>().ReverseMap();

        }
    }
}