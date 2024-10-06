import { Injectable, Logger } from '@nestjs/common';
import { MqttClient, connect } from 'mqtt';

@Injectable()
export class MqttService {
  private readonly logger = new Logger(MqttService.name);
  private readonly maxRetries = 5;
  private client: MqttClient;
  private retries = 0;

  constructor() {
    this.connectToBroker();
  }

  private async connectToBroker() {
    const url = 'mqtt://broker.hivemq.com:1883';

    this.client = connect(url, {
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
    });

    this.client.on('connect', () => {
      this.logger.log('Connected');
      this.retries = 0;
    });

    this.client.on('error', (err) => {
      console.error('Error connecting to MQTT Broker:', err);
      if (this.retries < this.maxRetries) {
        this.retries++;
        this.logger.warn(
          `Trying to reconnect... (Attempt ${this.retries} of ${this.maxRetries})`,
        );
        setTimeout(() => this.connectToBroker(), 5000);
      } else {
        this.logger.error('Max retries reached. Aborting...');
      }
    });
  }

  publish(topic: string, message: string): void {
    this.client.publish(topic, message, (err) => {
      if (err) {
        this.logger.error('Error publishing message:', err);
      } else {
        this.logger.log(`Message published to topic: ${topic}`);
      }
    });
  }

  subscribe(
    topic: string,
    messageHandler: (topic: string, message: Buffer) => void,
  ): void {
    this.client.subscribe(topic, (err) => {
      if (err) {
        this.logger.error('Error subscribing to topic:', err);
      } else {
        this.logger.log(`Subscribed to topic: ${topic}`);
        this.client.on('message', (receivedTopic, message) => {
          if (receivedTopic === topic) {
            messageHandler(receivedTopic, message);
          }
        });
      }
    });
  }
}
