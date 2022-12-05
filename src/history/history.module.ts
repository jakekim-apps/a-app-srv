import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { MongooseModule } from "@nestjs/mongoose";
import { HistorySchema } from "./history.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'History', schema: HistorySchema}])
  ],
  controllers: [HistoryController],
  providers: [HistoryService]
})
export class HistoryModule {}
