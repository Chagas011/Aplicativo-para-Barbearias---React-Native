export interface Service {
  id: string;
  barberShopId: string;
  name: string;
  duration: number;
  price: number;
  isActive?: boolean;
  photoURL?: string;
  createdAt: Date;
}
