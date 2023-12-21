import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from './author.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';

describe('AuthorService', () => {
  let service: AuthorService;
  let mockRepository;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest
        .fn()
        .mockImplementation((author) =>
          Promise.resolve({ id: Date.now(), ...author }),
        ),
      findAndCount: jest
        .fn()
        .mockImplementation(() => Promise.resolve([[new Author()], 1])),
      findOne: jest
        .fn()
        .mockImplementation(() => Promise.resolve(new Author())),
      preload: jest
        .fn()
        .mockImplementation((update) => Promise.resolve(update)),
      delete: jest.fn().mockImplementation(() => Promise.resolve()),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        {
          provide: getRepositoryToken(Author),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully create an author', async () => {
      const createAuthorDto = { firstName: 'John', lastName: 'Doe' };
      expect(await service.create(createAuthorDto)).toEqual(
        expect.objectContaining(createAuthorDto),
      );
      expect(mockRepository.create).toHaveBeenCalledWith(createAuthorDto);
      expect(mockRepository.save).toHaveBeenCalledWith(createAuthorDto);
    });
  });

  describe('findAll()', () => {
    it('should return a pagination object with authors', async () => {
      const result = await service.findAll(1, 10);
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('count');
      expect(result).toHaveProperty('currentPage');
      expect(result).toHaveProperty('totalPages');
      expect(mockRepository.findAndCount).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should return a single author', async () => {
      const id = 1;
      await service.findOne(id);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id } });
    });
  });

  describe('update()', () => {
    it('should update and return the author', async () => {
      const id = 1;
      const updateAuthorDto = { firstName: 'Jane', lastName: 'Doe' };
      const updatedAuthor = await service.update(id, updateAuthorDto);
      expect(updatedAuthor).toEqual(
        expect.objectContaining({ id, ...updateAuthorDto }),
      );
      expect(mockRepository.preload).toHaveBeenCalledWith({
        id,
        ...updateAuthorDto,
      });
    });

    it('should throw an error if the author does not exist', async () => {
      mockRepository.preload.mockReturnValue(undefined);
      const id = 1;
      const updateAuthorDto = { firstName: 'Jane', lastName: 'Doe' };
      await expect(service.update(id, updateAuthorDto)).rejects.toThrow(Error);
    });
  });

  describe('remove()', () => {
    it('should remove the author', async () => {
      const id = 1;
      await service.remove(id);
      expect(mockRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
