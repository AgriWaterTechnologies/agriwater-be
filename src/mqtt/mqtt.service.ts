import { Injectable, OnModuleInit } from '@nestjs/common';
import { MqttClient, connect } from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit {
  private client: MqttClient;
  private readonly maxRetries = 5;
  private retries = 0;

  onModuleInit() {
    this.connectToBroker();
  }

  private connectToBroker() {
    const url = 'mqtt://broker.hivemq.com:1883';

    this.client = connect(url, {
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 1000,
    });

    this.client.on('connect', () => {
      console.log('Conectado ao broker MQTT');
      this.retries = 0; // Reset retry count on successful connection
    });

    this.client.on('error', (err) => {
      console.error('Erro na conexão com o broker MQTT:', err);
      if (this.retries < this.maxRetries) {
        this.retries++;
        console.log(
          `Tentando reconectar... (Tentativa ${this.retries} de ${this.maxRetries})`,
        );
        setTimeout(() => this.connectToBroker(), 5000); // Tentar reconectar após 5 segundos
      } else {
        console.error('Número máximo de tentativas de reconexão atingido.');
      }
    });
  }

  publish(topic: string, message: string): void {
    this.client.publish(topic, message, (err) => {
      if (err) {
        console.error('Erro ao publicar no tópico:', err);
      } else {
        console.log(`Mensagem publicada no tópico ${topic}: ${message}`);
      }
    });
  }

  subscribe(
    topic: string,
    messageHandler: (topic: string, message: Buffer) => void,
  ): void {
    this.client.subscribe(topic, (err) => {
      if (err) {
        console.error('Erro ao se inscrever no tópico:', err);
      } else {
        console.log(`Inscrito no tópico: ${topic}`);
        this.client.on('message', (receivedTopic, message) => {
          if (receivedTopic === topic) {
            messageHandler(receivedTopic, message);
          }
        });
      }
    });
  }
}
