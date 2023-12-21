import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';

describe('BookService', () => {
  let service: BookService;
  let mockRepository;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest
        .fn()
        .mockImplementation((book) =>
          Promise.resolve({ id: Date.now(), ...book }),
        ),
      findAndCount: jest
        .fn()
        .mockImplementation(() => Promise.resolve([[new Book()], 1])),
      findOne: jest.fn().mockImplementation(() => Promise.resolve(new Book())),
      preload: jest
        .fn()
        .mockImplementation((update) => Promise.resolve(update)),
      delete: jest.fn().mockImplementation(() => Promise.resolve()),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully create a book', async () => {
      // Updated to include all required properties of CreateBookDto
      const bookDto = {
        title: 'New Book',
        pageCount: 100,
        authorId: 1,
        releaseDate: new Date(), // Add the releaseDate property
      };
      expect(await service.create(bookDto)).toEqual(
        expect.objectContaining(bookDto),
      );
      expect(mockRepository.create).toHaveBeenCalledWith(bookDto);
      expect(mockRepository.save).toHaveBeenCalledWith(bookDto);
    });
  });

  describe('findAll()', () => {
    it('should return a pagination object with books', async () => {
      const result = await service.findAll();
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('count');
      expect(result).toHaveProperty('currentPage');
      expect(result).toHaveProperty('totalPages');
      expect(mockRepository.findAndCount).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should return a single book', async () => {
      const id = 1;
      await service.findOne(id);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id } });
    });
  });

  describe('update()', () => {
    it('should update and return the book', async () => {
      const id = 1;
      const updateBookDto = {
        title: 'Updated Title',
        authorId: 1,
        pageCount: 200,
        releaseDate: new Date(),
      };
      const updatedBook = await service.update(id, updateBookDto);
      expect(updatedBook).toEqual(
        expect.objectContaining({ id, ...updateBookDto }),
      );
      expect(mockRepository.preload).toHaveBeenCalledWith({
        id,
        ...updateBookDto,
      });
    });

    it('should throw an error if the book does not exist', async () => {
      mockRepository.preload.mockReturnValue(undefined);
      const id = 1;
      const updateBookDto = {
        title: 'Updated Title',
        authorId: 1,
        pageCount: 200,
        releaseDate: new Date(),
      };

      await expect(service.update(id, updateBookDto)).rejects.toThrow(Error);
    });
  });

  describe('remove()', () => {
    it('should remove the book', async () => {
      const id = 1;
      await service.remove(id);
      expect(mockRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
