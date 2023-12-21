import { Test, TestingModule } from '@nestjs/testing';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';

describe('AuthorController', () => {
  let controller: AuthorController;
  let service: AuthorService;

  beforeEach(async () => {
    const mockAuthorService = {
      create: jest.fn((dto) => dto),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [
        {
          provide: AuthorService,
          useValue: mockAuthorService,
        },
      ],
    }).compile();

    controller = module.get<AuthorController>(AuthorController);
    service = module.get<AuthorService>(AuthorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a new author', async () => {
      const dto = { firstName: 'John', lastName: 'Doe' };
      await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of authors', async () => {
      await controller.findAll(1, 10);
      expect(service.findAll).toHaveBeenCalledWith(1, 10);
    });
  });

  describe('findOne()', () => {
    it('should retrieve a single author by ID', async () => {
      const id = '1';
      await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('update()', () => {
    it('should update an author', async () => {
      const dto = { firstName: 'Jane', lastName: 'Doe' };
      const id = '1';
      await controller.update(id, dto);
      expect(service.update).toHaveBeenCalledWith(+id, dto);
    });
  });

  describe('remove()', () => {
    it('should remove an author', async () => {
      const id = '1';
      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(+id);
    });
  });
});
