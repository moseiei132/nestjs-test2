import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UseUser } from "../common/decorators/user.decorator";
import { TUser } from "../users/transformers/user.transformer";
import { CreateTopicDto } from "./dtos/topic.dto";
import { Topic } from "./entities/topic.entity";
import { TopicService } from "./services/topic.service";
import { TTopic, TTopicReact } from "./transformers/topic.transformer";

@Controller('topics')
export class TopicController {
    constructor(
        private topicService: TopicService
    ) { }


    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createTopic(@UseUser() user: TUser, @Body() data: CreateTopicDto): Promise<Topic> {
        return this.topicService.createTopic({ userId: user.id, name: data.name, body: data.body })
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/:topicId')
    async createTopicReact(@UseUser() user: TUser, @Param('topicId') topicId: number, @Body('reaction') reaction: string): Promise<TTopicReact> {
        return this.topicService.createTopicReact({userId: user.id, topicId, reaction})
    }


    @Get('/:topicId')
    async getTopic(@Param('topicId') topicId: number): Promise<TTopic> {
        return this.topicService.getTopic(topicId)
    }
}