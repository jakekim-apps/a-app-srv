import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { CardSchema } from "./card.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Card', schema: CardSchema }])
  ],
  providers: [CardService],
  controllers: [CardController]
})
export class CardModule {}
