export type ICreateDeliveryUseCaseInputDto = {
  courierId: string;
  item: string;
  destinyAddress: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';
}

export type IUpdateDeliveryUseCaseInputDto = {
  id: string
  courierId?: string;
  destinyAddress?: string;
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';
}