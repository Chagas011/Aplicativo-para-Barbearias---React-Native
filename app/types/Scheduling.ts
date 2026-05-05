export type Scheduling = {
  id: string;
  barber: Barber;
  barbershop: Barbershop;
  service: Service;
  date: string;
  startTime: string;
};

export type Service = {
  name: string;
  price: number;
  duration: number;
};

export type Barber = {
  id: string;
  name: string;
  photoURL?: string | null;
};

export type Barbershop = {
  id: string;
  name: string;
  phone: string;
  address: Address;
  photoURL?: string | null;
};

export type Address = {
  street: string;
  number: string;
  city: string;
  state: string;
  zipCode: string;
};
