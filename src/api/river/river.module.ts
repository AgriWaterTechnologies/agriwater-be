import { Module } from '@nestjs/common';
import { RiverRepository } from '@/database/repositories/river.repository';
import { CreateRiverController } from './controllers/create-river.controller';
import { CreateRiverService } from './services/create-river.service';

@Module({
  providers: [RiverRepository, CreateRiverService],
  controllers: [CreateRiverController],
})
export class RiverModule {}
