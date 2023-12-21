import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  create(createAuthorDto: CreateAuthorDto) {
    const author = this.authorRepository.create(createAuthorDto);
    return this.authorRepository.save(author);
  }

  async findAll(page: number, limit: number) {
    const [data, count] = await this.authorRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(count / limit);
    return { data, count, currentPage: page, totalPages };
  }

  findOne(id: number) {
    return this.authorRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.authorRepository.preload({
      id: id,
      ...updateAuthorDto,
    });

    if (!author) {
      throw new Error(`Author #${id} not found`);
    }

    return this.authorRepository.save(author);
  }

  async remove(id: number): Promise<void> {
    await this.authorRepository.delete(id);
  }
}
