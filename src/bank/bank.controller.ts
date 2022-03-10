import { Body, Controller, Get, Post } from '@nestjs/common';

//swagger
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

// User
import { Bank_DTO } from './bank.model';
import { Bank_Service } from './bank.service';

@ApiTags('Bank')
@Controller('bank')
export class Bank_Controller {
  constructor(private readonly bank_service: Bank_Service) {}

  // Add Bank response
  @Post('/create_bank_response')
  @ApiCreatedResponse({ description: 'Recieve response of bank for payment' })
  async create_user(@Body() data: Bank_DTO) {
    const add_response = await this.bank_service.create_bank_response(data.key);
    return add_response;
  }

  // Get all bank responses
  @Get('/get_all_responses')
  @ApiOkResponse({ description: 'Get all responses in bd' })
  async get_all_responses() {
    const all_response = await this.bank_service.get_bank_responses();
    return all_response;
  }
}
