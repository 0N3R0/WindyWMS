import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { APP_CONSTANTS } from './app.constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('constants')
  getAppConstants() {
    return APP_CONSTANTS;
  }
}
