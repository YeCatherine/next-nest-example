import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Book Title', description: 'The title of the book' })
  readonly title: string;

  @ApiProperty({ example: '1', description: 'Id' })
  @IsInt()
  readonly authorId: number;

  @ApiProperty({ example: '100', description: 'Page Count' })
  @IsInt()
  readonly pageCount: number;

  @ApiProperty({ example: '2023-01-01', description: 'The release date' })
  @IsDate()
  readonly releaseDate: Date;
}
