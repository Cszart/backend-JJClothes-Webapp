import { Controller, Get, Param } from '@nestjs/common';

//swagger
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

// Report service
import { Report_Service } from './reports.service';

@ApiTags('Reports')
@Controller('report')
export class Report_Controller {
  constructor(private readonly report_service: Report_Service) {}

  // Get all orders by user
  @Get('/get_orders_by_users/:startDate/:endDate')
  @ApiOkResponse({ description: 'Get all orders by user' })
  async get_orders_by_users(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {
    const orderUser_response = await this.report_service.get_orders_by_users(
      startDate,
      endDate,
    );
    return orderUser_response;
  }

  // Get all orders by user
  @Get('/get_orders_by_date/:startDate/:endDate')
  @ApiOkResponse({ description: 'Get all orders by user' })
  async get_orders_by_date(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {
    const orderUser_response = await this.report_service.get_categories_by_date(
      startDate,
      endDate,
    );
    return orderUser_response;
  }

  // Get category by amount
  @Get('/get_category_by_amount/:startDate/:endDate')
  @ApiOkResponse({ description: 'Get all orders by user' })
  async get_category_by_amount(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {
    const orderUser_response =
      await this.report_service.get_categories_by_amount(startDate, endDate);
    return orderUser_response;
  }

  // Get top ten products by category
  @Get('/get_topTen_products/:startDate/:endDate')
  @ApiOkResponse({ description: 'Get all orders by user' })
  async get_topTen_products(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {
    const orderUser_response = await this.report_service.get_topTen_products(
      startDate,
      endDate,
    );
    return orderUser_response;
  }

  // Get bottom ten products by category
  @Get('/get_bottomTen_products/:startDate/:endDate')
  @ApiOkResponse({ description: 'Get all orders by user' })
  async get_bottomTen_products(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {
    const orderUser_response = await this.report_service.get_bottomTen_products(
      startDate,
      endDate,
    );
    return orderUser_response;
  }

  // Get top ten products by tags
  @Get('/get_topTen_tags_products/:startDate/:endDate')
  @ApiOkResponse({ description: 'Get all orders by user' })
  async get_topTen_tags_products(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {
    const orderUser_response =
      await this.report_service.get_topTen_tag_products(startDate, endDate);
    return orderUser_response;
  }

  // Get top ten products by tags
  @Get('/get_bottomTen_tags_products/:startDate/:endDate')
  @ApiOkResponse({ description: 'Get all orders by user' })
  async get_bottomTen_tags_products(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {
    const orderUser_response =
      await this.report_service.get_bottomTen_tag_products(startDate, endDate);
    return orderUser_response;
  }
}
