import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm'

interface IDateEntity {
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

@EventSubscriber()
export class DateSubscriber implements EntitySubscriberInterface {
  beforeInsert(event: InsertEvent<IDateEntity>): void {
    if (event.entity) {
      event.entity.createdAt = new Date()
      event.entity.updatedAt = new Date()
    }
  }
  beforeUpdate(event: UpdateEvent<IDateEntity>): void {
    if (event.entity) event.entity.updatedAt = new Date()
  }
}
