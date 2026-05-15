export interface Service {
  id: string;
  barberId: string;
  name: string;
  duration: number;
  price: number;
  isActive?: boolean;
  photoURL?: string;
  createdAt: Date;
}
