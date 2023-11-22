using API.Interfaces;
using AutoMapper;

namespace API.Data;

public class UnitOfWork : IUnitOfWork
{
    private readonly IMapper _mapper;
    private readonly DataContext _dataContext;

    public UnitOfWork(DataContext dataContext, IMapper mapper)
    {
        _mapper = mapper;
        _dataContext = dataContext;
    }

    public IUserRepository UserRepository => new UserRepository(_dataContext, _mapper);

    public IMessageRepository MessageRepository => new MessageRepository(_dataContext, _mapper);

    public ILikesRepository LikesRepository => new LikesRepoitory(_dataContext);

    public async Task<bool> Complete()
    {
        return await _dataContext.SaveChangesAsync() > 0;
    }

    public bool HasChanges()
    {
        return _dataContext.ChangeTracker.HasChanges();
    }
}
