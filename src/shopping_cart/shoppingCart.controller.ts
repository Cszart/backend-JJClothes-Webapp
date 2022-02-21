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

// ShoppingCart
import { ShoppingCart_DTO } from './shoppingCart.model';
import { ShoppingCart_Service } from './shoppingCart.service';

import { Product_Item_DTO } from 'src/product/product.model';

@ApiTags('ShoppingCart')
@Controller('shoppingCart')
export class ShoppingCart_Controller {
  constructor(private readonly shoppingCart_service: ShoppingCart_Service) {}

  // Add shoppingCart
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/create_shoppingCart')
  @ApiCreatedResponse({ description: 'Create a shoppingCart in database' })
  async create_shoppingCart(@Body() data: ShoppingCart_DTO) {
    const add_response = await this.shoppingCart_service.create_shoppingCart(
      data,
    );
    return add_response;
  }

  // Update shoppingCart
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('/update_shoppingCart/:id')
  @ApiOkResponse({ description: 'Update an shoppingCart information' })
  async update_shoppingCart(
    @Param('id') shoppingCart_id: string,
    @Body() data: ShoppingCart_DTO,
  ) {
    const update_response = await this.shoppingCart_service.update_shoppingCart(
      shoppingCart_id,
      data,
    );
    return update_response;
  }

  // Add prodcut to shoppingCart
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('/add_product_shoppingCart/:id')
  @ApiOkResponse({ description: 'Add a product to shoppingCart' })
  async add_product_shoppingCart(
    @Param('id') shoppingCart_id: string,
    @Body() data: Product_Item_DTO,
  ) {
    const update_response =
      await this.shoppingCart_service.add_product_shoppingCart(
        shoppingCart_id,
        data,
      );
    return update_response;
  }

  // Get all shoppingCarts
  @Get('/get_all_shoppingCarts')
  @ApiOkResponse({ description: 'Get all shoppingCarts in database' })
  async get_all_shoppingCarts() {
    const all_response = await this.shoppingCart_service.find_all();
    return all_response;
  }

  // Get shoppingCart by id
  @Get('/get_shoppingCart_byID/:id')
  @ApiOkResponse({ description: 'Get an shoppingCart by id' })
  async get_shoppingCart_byID(@Param('id') shoppingCart_id: string) {
    const byID_response = await this.shoppingCart_service.find_byID(
      shoppingCart_id,
    );
    return byID_response;
  }

  // Delete shoppingCart
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({ description: 'Delete an shoppingCart from database' })
  async delete_shoppingCart(@Param('id') shoppingCart_id: string) {
    const delete_response = await this.shoppingCart_service.delete_shoppingCart(
      shoppingCart_id,
    );
    return delete_response;
  }
}
