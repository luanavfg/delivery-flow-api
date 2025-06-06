export interface IDeliveryEntity {
  id: string;
  courierId: string;
  item: string;
  destinyAddress: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';
  createdAt: Date;
  updatedAt: Date | null;
}