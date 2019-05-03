import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message-dto';

@Injectable()
export class MessagesService {
    constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    ){}

     async getAll(): Promise<Message[]>{
        return await this.messageRepository.find();
    }

    async createMessage(message: CreateMessageDto):Promise<Message>{
        const newMessage = new Message();
        newMessage.message = message.message;
        newMessage.nick = message.nick;
        
        return this.messageRepository.save(newMessage);
    }

    async updateMessage(messageId:  number,message: CreateMessageDto):Promise<Message>{
        const updateMessage =  await this.messageRepository.findOne(messageId);
        updateMessage.nick = message.nick;
        updateMessage.message = message.message;
        
        return await this.messageRepository.save(updateMessage);
    }

    async deleteMessage(idMessage:number): Promise<any>{
        return await this.messageRepository.delete(idMessage);
    }
}
