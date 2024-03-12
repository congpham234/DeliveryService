import { GetDeliveriesDao } from '../../daos/get-deliveries-dao';
import { DeliveryNotFoundError } from '../../exceptions/delivery-not-found-error';
import { inject, singleton } from 'tsyringe';
import { Delivery } from '../../../generated';

@singleton()
export class GetDeliveryHandler {
  private readonly deliveriesDao: GetDeliveriesDao;

  constructor(@inject(GetDeliveriesDao) deliveriesDao: GetDeliveriesDao) {
    this.deliveriesDao = deliveriesDao;
  }

  public async getDelivery(deliveryId: string): Promise<Delivery> {
    const delivery = await this.deliveriesDao.getDeliveryById(deliveryId);
    if (delivery) {
      return delivery;
    } else {
      throw new DeliveryNotFoundError('Delivery not found');
    }
  }
}
