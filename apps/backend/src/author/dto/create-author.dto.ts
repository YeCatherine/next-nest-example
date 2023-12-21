import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty({ example: 'AuthoFirstName', description: 'Author First Name' })
  @IsString()
  readonly firstName: string;

  @ApiProperty({ example: 'AuthoLastName', description: 'Author Last Name' })
  @IsString()
  readonly lastName: string;
}
