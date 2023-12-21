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
  ): Promise<{
    data: Book[];
    count: number;
    currentPage: number;
    totalPages: number;
  }> {
    // Validate page and limit
    page = page > 0 ? page : 1;
    limit = limit > 0 ? limit : 10;

    const [data, count] = await this.bookRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    // Calculate the total number of pages
    const totalPages = Math.ceil(count / limit);

    // Return the data along with pagination details
    return { data, count, currentPage: page, totalPages };
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
