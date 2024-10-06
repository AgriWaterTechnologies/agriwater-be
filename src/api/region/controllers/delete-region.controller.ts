import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteRegionService } from '../services/delete-region.service';
import { DeleteRegionParamsDto } from '../interfaces/delete-region.interfaces';

@Controller('/regions')
export class DeleteRegionController {
  constructor(private readonly deleteRegion: DeleteRegionService) {}

  @Delete('/:id')
  async handle(@Param() { id }: DeleteRegionParamsDto) {
    return this.deleteRegion.execute(id);
  }
}
