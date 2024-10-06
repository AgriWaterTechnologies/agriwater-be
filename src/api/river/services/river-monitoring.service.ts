import { Injectable, Logger } from '@nestjs/common';
import { MqttService } from '@/infra/iot/mqtt/mqtt.service';
import { UpdateFirstRiverService } from './update-first-river.service';

@Injectable()
export class RiverMonitoringService {
  private readonly logger = new Logger(RiverMonitoringService.name);
  constructor(
    private readonly mqtt: MqttService,
    private readonly updateFirstRiver: UpdateFirstRiverService,
  ) {}

  async onModuleInit() {
    this.mqtt.subscribe('AgriWater/data/level', async (topic, message) => {
      const data = JSON.parse(message.toString());
      this.logger.log(`Received message (topic=${topic}, message=${data})`);

      const river = await this.updateFirstRiver.execute({
        height: Number(data),
      });

      this.logger.log(`${river.name} level updated`);
    });
  }
}
