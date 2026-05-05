export type Address = {
  street: string;
  number: string;
  city: string;
  state: string;
  zipCode: string;
};
export type SocialMedia = {
  name: string;
  url: string;
};

export type OpeningHours = {
  dayOfWeek: number;
  open: string;
  close: string;
};

export interface Barbershop {
  id: string;
  name: string;
  phone: string;
  socialMedia: SocialMedia[];
  address: Address;

  photoURL?: string | null;

  openingHours: OpeningHours[];

  createdAt: Date;
}
