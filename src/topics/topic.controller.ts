import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { UseUser } from '../common/decorators/user.decorator'
import { TUser } from '../users/transformers/user.transformer'
import { CreateTopicDto } from './dtos/topic.dto'
import { Topic } from './entities/topic.entity'
import { TopicService } from './services/topic.service'
import {
  TTopic,
  TTopicReact,
  TUpdatedTopic,
} from './transformers/topic.transformer'

@ApiTags('TopicController')
@Controller('topics')
export class TopicController {
  constructor(private topicService: TopicService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiCreatedResponse()
  async createTopic(
    @UseUser() user: TUser,
    @Body() data: CreateTopicDto,
  ): Promise<Topic> {
    return this.topicService.createTopic({
      userId: user.id,
      name: data.name,
      body: data.body,
    })
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/:topicId')
  @ApiCreatedResponse()
  async createTopicReact(
    @UseUser() user: TUser,
    @Param('topicId') topicId: number,
    @Body('reaction') reaction: string,
  ): Promise<TTopicReact> {
    return this.topicService.createTopicReact({
      userId: user.id,
      topicId,
      reaction,
    })
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:topicId')
  @ApiOkResponse()
  async updateTopic(
    @UseUser() user: TUser,
    @Param('topicId') topicId: number,
    @Body() data: CreateTopicDto,
  ): Promise<TUpdatedTopic> {
    return this.topicService.updateTopic({
      userId: user.id,
      topicId,
      body: data.body,
      name: data.name,
    })
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:topicId')
  @ApiOkResponse()
  async deleteTopic(
    @UseUser() user: TUser,
    @Param('topicId') topicId: number,
  ): Promise<TUpdatedTopic> {
    return this.topicService.deleteTopic({
      userId: user.id,
      topicId,
    })
  }

  @Get('/:topicId')
  @ApiOkResponse()
  async getTopic(@Param('topicId') topicId: number): Promise<TTopic> {
    return this.topicService.getTopic(topicId)
  }
}
