import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  keepAlive(): string {
    return 'The server is live.';
  }
}
