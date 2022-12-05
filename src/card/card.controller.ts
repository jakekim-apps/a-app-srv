import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CardService } from "./card.service";
import { CardDocument } from "./card.schema";

@Controller('card')
export class CardController {
  constructor(private cardService: CardService) {}

  @Post()
  createCard(
    @Body('name') name: string,
    @Body('number') number: string,
    @Body('description') description: string
  ): Promise<CardDocument> {
    return this.cardService.create(name, number, description);
  }

  @Get()
  findAllCards(): Promise<CardDocument[]> {
    return this.cardService.findAll();
  }

  @Get(':id')
  findCard(@Param('id') id: string): Promise<CardDocument> {
    return this.cardService.find(id);
  }

  @Patch(':id')
  updateCard(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('number') number: string,
    @Body('description') description: string
  ): Promise<CardDocument> {
    return this.cardService.update(id, name, number, description);
  }

  @Delete(':id')
  deleteCard(
    @Param('id') id: string
  ) {
    return this.cardService.delete(id);
  }

  @Delete()
  deleteAllCards(
    @Body('idList') idList: string[]
  ) {
    return this.cardService.deleteAll(idList);
  }

}
