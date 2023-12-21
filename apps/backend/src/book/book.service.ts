import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  async findAll(
    page = 1,
    limit = 10,
  ): Promise<{ data: Book[]; count: number }> {
    const [data, count] = await this.bookRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, count };
  }

  async findOne(id: number): Promise<Book | undefined> {
    return this.bookRepository.findOne({ where: { id } });
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.bookRepository.preload({
      id: id,
      ...updateBookDto,
    });

    if (!book) {
      throw new Error(`Book #${id} not found`);
    }

    return this.bookRepository.save(book);
  }

  async remove(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
