// identity/identity.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MasterProfileUpdatedEvent } from '../contract/events/master-profile-updated.event';

@Injectable()
export class IdentityService {
  constructor(
    @Inject('RABBITMQ_CLIENT') private readonly brokerClient: ClientProxy,
  ) {}

  async updateMasterProfile(masterId: string, updateDto: any) {
    // const updatedProfile = await this.profileRepository.update(masterId, updateDto);
    
    const newName = updateDto.name || 'Оновлене Ім\'я Майстра';
    const newAvatar = updateDto.avatarUrl || 'https://storage.example.com/avatars/1.jpg';

    const event = new MasterProfileUpdatedEvent(
      masterId,
      newName,
      newAvatar,
      new Date()
    );

    // 3. Публікація події в RabbitMQ (Exchange: profile.events)
    this.brokerClient.emit('master.profile.updated', event);

    return { message: 'Профіль успішно оновлено' };
  }
}
