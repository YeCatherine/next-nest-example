import { IsString, IsInt, IsNotEmpty, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Book Title', description: 'The title of the book' })
  readonly title: string;

  @ApiProperty({ example: '1', description: 'Id of Author' })
  @IsInt()
  readonly authorId: number;

  @ApiProperty({ example: '100', description: 'Amound of pages' })
  @IsInt()
  readonly pageCount: number;

  @ApiProperty({ example: '2023-01-01', description: 'The release date' })
  @IsDate()
  readonly releaseDate: Date;
}
