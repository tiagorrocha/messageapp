import { Controller, Post, Body, Get, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message-dto';
import { MessagesService } from './messages.service';
import { response } from 'express';

@Controller('messages')
export class MessagesController {
    
    constructor(private messagesService: MessagesService){

    }
    
    @Post()
    create(@Body ()createMessageDto : CreateMessageDto,@Res() response){
        this.messagesService.createMessage(createMessageDto).then( message => {
            response.status(HttpStatus.CREATED).json(message);
        }).catch( () =>{
            response.status(HttpStatus.FORBIDDEN).json({message : 'error in creating the message.'});
         });
    }

    @Get()
    getAll(@Res() response){
        this.messagesService.getAll().then(messageList => {
            response.status(HttpStatus.OK).json(messageList);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({message : 'error in obtaining the data.'});
        });
        
    }

    @Put(':id')
    update(@Body()updateMessageDto:CreateMessageDto, @Res() response, @Param('id') idMessage){
        this.messagesService.updateMessage(idMessage,updateMessageDto).then(message =>{
            response.status(HttpStatus.OK).json(message);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({message : 'error in updating the message.'});
        });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idMessage){
        this.messagesService.deleteMessage(idMessage).then(res => {
            response.status(HttpStatus.OK).json(res);
        }).catch(() =>{
            response.status(HttpStatus.FORBIDDEN).json({message : 'error in deleting the message.'});
        });
    }
}
