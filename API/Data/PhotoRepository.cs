using API.DTOs;
using API.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace API.Data;

public class PhotoRepository : IPhotoRepository
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public PhotoRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<Photo> GetPhotoById(int id)
    {
        var photo = await _context.Photos.IgnoreQueryFilters().SingleOrDefaultAsync(x => x.Id == id);
        return photo;
    }

    public async Task<IEnumerable<PhotoForApprovalDto>> GetUnapprovedPhotos()
    {
        return await _context.Photos.IgnoreQueryFilters().Where(x => x.IsApproved == false)
        .Select(u => new PhotoForApprovalDto
        {
            Id = u.Id,
            Url = u.Url,
            Username = u.AppUser.UserName,
            IsApproved = u.IsApproved
        }).ToListAsync();
    }

    public void RemovePhoto(Photo photo)
    {
        _context.Photos.Remove(photo);
    }
}
