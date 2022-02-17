import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

//swagger
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

// Order
import { Order_DTO } from './order.model';
import { Order_Service } from './order.service';

@ApiTags('Order')
@Controller('order')
export class Order_Controller {
  constructor(private readonly order_service: Order_Service) {}

  // Add order
  @Post('/create_order')
  @ApiCreatedResponse({ description: 'Create a order in database' })
  async create_order(@Body() data: Order_DTO) {
    const add_response = await this.order_service.create_order(data);
    return add_response;
  }

  // Update order
  @Patch('/update_order/:id')
  @ApiOkResponse({ description: 'Update an order information' })
  async update_order(@Param('id') order_id: string, @Body() data: Order_DTO) {
    const update_response = await this.order_service.update_order(
      order_id,
      data,
    );
    return update_response;
  }

  // Get all orders
  @Get('/get_all_orders')
  @ApiOkResponse({ description: 'Get all orders in database' })
  async get_all_orders() {
    const all_response = await this.order_service.find_all();
    return all_response;
  }

  // Get order by id
  @Get('/get_order_byID/:id')
  @ApiOkResponse({ description: 'Get an order by id' })
  async get_order_byID(@Param('id') order_id: string) {
    const byID_response = await this.order_service.find_byID(order_id);
    return byID_response;
  }

  // Get order by id
  @Get('/get_order_byDateRange/:startDate/:endDate')
  @ApiOkResponse({ description: 'Get an order by date range' })
  async get_order_byDateRange(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {
    const byDate_response = await this.order_service.find_date_range(
      startDate,
      endDate,
    );
    return byDate_response;
  }

  // Delete order
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({ description: 'Delete an order from database' })
  async delete_order(@Param('id') order_id: string) {
    const delete_response = await this.order_service.delete_order(order_id);
    return delete_response;
  }
}
