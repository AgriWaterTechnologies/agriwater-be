import { Module } from '@nestjs/common';
import { CreateRegionService } from './services/create-region.service';
import { ListRegionsService } from './services/list-region.service';
import { DeleteRegionService } from './services/delete-region.service';
import { CreateRegionController } from './controllers/create-region.controller';
import { ListRegionsController } from './controllers/list-regions.controller';
import { DeleteRegionController } from './controllers/delete-region.controller';
import { RegionRepository } from '@/database/repositories/region.repository';

@Module({
  providers: [
    RegionRepository,
    CreateRegionService,
    ListRegionsService,
    DeleteRegionService,
  ],
  controllers: [
    CreateRegionController,
    ListRegionsController,
    DeleteRegionController,
  ],
})
export class RegionModule {}
