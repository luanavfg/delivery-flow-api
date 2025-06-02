export interface IDeliveryEntity {
  id: string;
  courierId: string;
  destinyAddress: string;
  status: 'pending' | 'inProgress' | 'completed';
  createdAt: Date;
  updatedAt: Date | null;
}