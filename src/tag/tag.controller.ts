import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

// tag
import { Tag_DTO } from './tag.model';
import { Tag_Service } from './tag.service';

@ApiTags('Tags')
@Controller('tag')
export class Tag_Controller {
  constructor(private readonly tag_Service: Tag_Service) {}

  // Add tag
  @Post('/add_tag')
  @ApiCreatedResponse({ description: 'Create a tag in database' })
  async add_tag(@Body() data: Tag_DTO) {
    const add_response = await this.tag_Service.insert_tag(data);
    return add_response;
  }

  // Get all tags
  @Get('/get_all_tags')
  @ApiOkResponse({ description: 'Get all tags in database' })
  async get_all_tags() {
    const all_response = await this.tag_Service.find_all();
    return all_response;
  }

  // Get tag by id
  @Get('/get_tag_byID/:id')
  @ApiOkResponse({ description: 'Get an tag by id' })
  async get_tag_byID(@Param('id') tag_id: string) {
    const byID_response = await this.tag_Service.find_byID(tag_id);
    return byID_response;
  }

  // Delete tag
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({ description: 'Delete an tag from database' })
  async delete_tag(@Param('id') tag_id: string) {
    const delete_response = await this.tag_Service.delete_tag(tag_id);
    return delete_response;
  }
}
