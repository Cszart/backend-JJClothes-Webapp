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

// Product
import { Product_DTO } from './product.model';
import { Product_Service } from './product.service';

@ApiTags('Products')
@Controller('product')
export class Product_Controller {
  constructor(private readonly product_service: Product_Service) {}

  // Add product
  @Post('/add_product')
  @ApiCreatedResponse({ description: 'Create a product in database' })
  async add_product(@Body() data: Product_DTO) {
    const add_response = await this.product_service.insert_product(data);
    return add_response;
  }

  // Restock all products
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('/restock_products/:restock')
  @ApiOkResponse({ description: 'Update all products stock' })
  async restock_products(@Param('restock') restock: number) {
    const response_response = await this.product_service.restock_all(restock);
    return response_response;
  }

  // Get all products
  @Get('/get_all_products')
  @ApiOkResponse({ description: 'Get all products in database' })
  async get_all_products() {
    const all_response = await this.product_service.find_all();
    return all_response;
  }

  // Get product by id
  @Get('/get_product_byID/:id')
  @ApiOkResponse({ description: 'Get an product by id' })
  async get_product_byID(@Param('id') product_id: string) {
    const byID_response = await this.product_service.find_byID(product_id);
    return byID_response;
  }

  // Get product by name
  @Get('/get_product_byCategory/:category_id')
  @ApiOkResponse({ description: 'Get an product by tag' })
  async get_product_byCategory(@Param('category_id') category_id: string) {
    const byID_response = await this.product_service.find_by_category(
      category_id,
    );
    return byID_response;
  }

  // Get product by name
  @Get('/get_product_byTag/:name')
  @ApiOkResponse({ description: 'Get an product by tag' })
  async get_product_byTag(@Param('name') name: string) {
    const byID_response = await this.product_service.find_by_tag(name);
    return byID_response;
  }

  // Get product by name
  @Get('/get_product_byName/:name')
  @ApiOkResponse({ description: 'Get an product by name' })
  async get_product_byName(@Param('name') name: string) {
    const byID_response = await this.product_service.find_by_name(name);
    return byID_response;
  }

  // Get product by name
  @Get('/get_product_by_tag_or_name/:name')
  @ApiOkResponse({ description: 'Get an product by name' })
  async get_product_by_tag_or_name(@Param('name') name: string) {
    const byID_response = await this.product_service.find_by_tag_or_name(name);
    return byID_response;
  }

  // Get new products
  @Get('/get_new_products')
  @ApiOkResponse({ description: 'Get the new products in database' })
  async get_new_products() {
    const new_products_response =
      await this.product_service.find_new_products();
    return new_products_response;
  }

  // Delete product
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({ description: 'Delete an product from database' })
  async delete_product(@Param('id') product_id: string) {
    const delete_response = await this.product_service.delete_product(
      product_id,
    );
    return delete_response;
  }
}
