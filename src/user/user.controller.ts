import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

//swagger
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

// User
import { User_DTO } from './user.model';
import { User_Service } from './user.service';

@ApiTags('Users')
@Controller('user')
export class User_Controller {
  constructor(private readonly user_service: User_Service) {}

  // Add user
  @Post('/create_user')
  @ApiCreatedResponse({ description: 'Create a user in database' })
  async create_user(@Body() data: User_DTO) {
    const add_response = await this.user_service.create_user(data);
    return add_response;
  }

  // Update user
  @Patch('/update_user/:id')
  @ApiOkResponse({ description: 'Update an user information' })
  async update_user(@Param('id') user_id: string, @Body() data: User_DTO) {
    const update_response = await this.user_service.update_user(user_id, data);
    return update_response;
  }

  // Get all users
  @Get('/get_all_users')
  @ApiOkResponse({ description: 'Get all users in database' })
  async get_all_users() {
    const all_response = await this.user_service.find_all();
    return all_response;
  }

  // Get user by id
  @Get('/get_user_byID/:id')
  @ApiOkResponse({ description: 'Get an user by id' })
  async get_user_byID(@Param('id') user_id: string) {
    const byID_response = await this.user_service.find_byID(user_id);
    return byID_response;
  }

  // Delete user
  @Delete(':id')
  @ApiOkResponse({ description: 'Delete an user from database' })
  async delete_user(@Param('id') user_id: string) {
    const delete_response = await this.user_service.delete_user(user_id);
    return delete_response;
  }
}
