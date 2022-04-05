import { Body, Controller, Get, Post } from '@nestjs/common';

//swagger
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

// User
import { Bank_Active_DTO } from './bank.model';
import { Bank_Service } from './bank.service';

///// Custom decorator /////
import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import * as rawBody from 'raw-body';

export const PlainBody = createParamDecorator(
  async (_, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<import('express').Request>();
    if (!req.readable) {
      throw new BadRequestException('Invalid body');
    }

    const body = (await rawBody(req)).toString('utf8').trim();
    return body;
  },
);

@ApiTags('Bank')
@Controller('bank')
export class Bank_Controller {
  constructor(private readonly bank_service: Bank_Service) {}

  // Add Bank response
  @Post('/create_bank_response')
  @ApiConsumes('text/plain')
  @ApiCreatedResponse({ description: 'Recieve response of bank for payment' })
  async create_bank_response(@PlainBody() data: string) {
    const create_response = this.bank_service.create_bank_response(data);
    return create_response;
  }

  // Get all bank responses
  @Get('/get_all_responses')
  @ApiOkResponse({ description: 'Get all responses in bd' })
  async get_all_responses() {
    const all_response = await this.bank_service.get_bank_responses();
    return all_response;
  }

  // Add shoppingCart
  @Post('/change_active_bank')
  @ApiCreatedResponse({ description: 'Change active bank on bd' })
  async create_shoppingCart(@Body() data: Bank_Active_DTO) {
    const change_response = await this.bank_service.change_active_bank(
      data.name,
    );

    return change_response;
  }

  // Get all bank responses
  @Get('/get_active_bank')
  @ApiOkResponse({ description: 'Get all responses in bd' })
  async get_active_bank() {
    const active_response = await this.bank_service.get_active_bank();
    return active_response;
  }
}
