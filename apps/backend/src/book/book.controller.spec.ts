import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';

describe('BookController', () => {
  let controller: BookController;
  let service: BookService;

  // Mocking the BookService
  const mockBookService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    findAll: jest.fn().mockImplementation((page, limit) => {
      return [];
    }),
    findOne: jest.fn().mockImplementation((id) => {
      return { id, title: 'Test Book', pageCount: 100, author: {} };
    }),
    update: jest.fn().mockImplementation((id, dto) => ({ id, ...dto })),
    remove: jest.fn().mockImplementation((id) => ({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: mockBookService,
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return an array of books', async () => {
      expect(await controller.findAll(1, 10)).toEqual([]);
      expect(mockBookService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should get a single book', async () => {
      const id = 1;
      expect(await controller.findOne(id.toString())).toEqual({
        id,
        title: 'Test Book',
        pageCount: 100,
        author: {},
      });
      expect(mockBookService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update()', () => {
    it('should update a book', async () => {
      const id = 1;

      const updateBookDto = {
        title: 'Updated Book',
        authorId: 1,
        pageCount: 200,
        releaseDate: new Date(),
      };
      expect(await controller.update(id.toString(), updateBookDto)).toEqual({
        id,
        ...updateBookDto,
      });
      expect(mockBookService.update).toHaveBeenCalledWith(id, updateBookDto);
    });
  });

  describe('remove()', () => {
    it('should delete a book', async () => {
      const id = 1;
      expect(await controller.remove(id.toString())).toEqual({ id });
      expect(mockBookService.remove).toHaveBeenCalledWith(id);
    });
  });
});
