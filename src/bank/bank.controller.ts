import { Body, Controller, Post } from '@nestjs/common';

//swagger
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

// User
import { Bank_DTO } from './bank.model';
import { Bank_Service } from './bank.service';

@ApiTags('Bank')
@Controller('bank')
export class Bank_Controller {
  constructor(private readonly bank_service: Bank_Service) {}

  // Add user
  @Post('/create_bank_response')
  @ApiCreatedResponse({ description: 'Recieve response of bank for payment' })
  async create_user(@Body() data: Bank_DTO) {
    const add_response = await this.bank_service.create_bank_response(data.key);
    return add_response;
  }
}
