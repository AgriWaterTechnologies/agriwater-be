import { Module } from '@nestjs/common';
import { RiverRepository } from '@/database/repositories/river.repository';
import { CreateRiverController } from './controllers/create-river.controller';
import { GetFirstRiverController } from './controllers/get-first-river.controller';
import { CreateRiverService } from './services/create-river.service';
import { UpdateFirstRiverService } from './services/update-first-river.service';
import { RiverMonitoringService } from './services/river-monitoring.service';
import { GetFirstRiverService } from './services/get-first-river.service';

@Module({
  providers: [
    RiverRepository,
    RiverMonitoringService,
    CreateRiverService,
    GetFirstRiverService,
    UpdateFirstRiverService,
  ],
  controllers: [CreateRiverController, GetFirstRiverController],
})
export class RiverModule {}
