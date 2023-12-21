import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! This is the backend service for the book store. Please use the frontend link http://localhost:3030 to access the book store or swagger link http://localhost:3000/api to access the backend service';
  }
}
