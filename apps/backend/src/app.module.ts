import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameController } from './game/game.controller';
import { ChatController } from './chat/chat.controller';

@Module({
  imports: [],
  controllers: [AppController, GameController, ChatController],
  providers: [AppService],
})
export class AppModule {}
