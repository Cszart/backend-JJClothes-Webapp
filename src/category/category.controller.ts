import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

//swagger
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

// category
import { Category_DTO } from './category.model';
import { Category_Service } from './category.service';

@ApiTags('Category')
@Controller('category')
export class Category_Controller {
  constructor(private readonly category_Service: Category_Service) {}

  // Add category
  @Post('/add_category')
  @ApiCreatedResponse({ description: 'Create a category in database' })
  async add_category(@Body() data: Category_DTO) {
    const add_response = await this.category_Service.insert_category(data);
    return add_response;
  }

  // Get all categories
  @Get('/get_all_categories')
  @ApiOkResponse({ description: 'Get all categories in database' })
  async get_all_categories() {
    const all_response = await this.category_Service.find_all();
    return all_response;
  }

  // Get category by id
  @Get('/get_category_byID/:id')
  @ApiOkResponse({ description: 'Get an category by id' })
  async get_category_byID(@Param('id') category_id: string) {
    const byID_response = await this.category_Service.find_byID(category_id);
    return byID_response;
  }

  // Delete category
  @Delete(':id')
  @ApiOkResponse({ description: 'Delete an category from database' })
  async delete_category(@Param('id') category_id: string) {
    const delete_response = await this.category_Service.delete_category(
      category_id,
    );
    return delete_response;
  }
}
