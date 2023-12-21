import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly AuthorService: AuthorService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.AuthorService.create(createAuthorDto);
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    // Ensure the page and limit are positive numbers; set defaults if not provided
    page = page > 0 ? page : 1;
    limit = limit > 0 ? limit : 10;
    return this.AuthorService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.AuthorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.AuthorService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.AuthorService.remove(+id);
  }
}
