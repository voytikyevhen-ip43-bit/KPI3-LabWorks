// marketplace/marketplace.controller.ts
import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MasterProfileUpdatedEvent } from '../contract/events/master-profile-updated.event';

@Controller()
export class MarketplaceController {
  private readonly logger = new Logger(MarketplaceController.name);

  @EventPattern('master.profile.updated')
  async handleMasterProfileUpdated(@Payload() data: MasterProfileUpdatedEvent) {
    this.logger.log(`Отримано подію оновлення профілю для майстра: ${data.masterId}`);
    
    try {
      // 1. Логіка оновлення локальної Read Model у базі Marketplace (MSSQL)
      this.logger.log(`Оновлюємо кеш/локальну БД каталогу: нове ім'я - ${data.displayName}`);
      
      // await this.marketplaceMasterRepository.update(
      //   { id: data.masterId }, 
      //   { name: data.displayName, avatar: data.avatarUrl }
      // );
      
      this.logger.log('Локальну копію даних майстра в Маркетплейсі успішно синхронізовано.');
    } catch (error) {
      this.logger.error(`Помилка синхронізації профілю: ${error.message}`);
      // Тут можна додати логіку для Dead Letter Queue (DLQ), якщо запис в БД впав
    }
  }
}
