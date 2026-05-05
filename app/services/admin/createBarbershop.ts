import { Barbershop } from "@/app/types/Barbershop";
import { httpClient } from "../htppClient";

export type Address = {
  street: string;
  number: string;
  city: string;
  state: string;
  zipCode: string;
};

export type OpeningHours = {
  dayOfWeek: number;
  open: string;
  close: string;
};
export type SocialMedia = {
  name: string;
  url: string;
};

interface BarbershopData {
  name: string;
  address: Address;
  phone: string;
  socialMedia?: SocialMedia[];
  openingHours: OpeningHours[];
  file?: {
    type: string;
    size: number;
  };
}
interface CreateBarbershopResponse {
  barberShop: Barbershop;
  fileKey?: string;
  uploadSignature?: string;
}
interface CreateBarbershopParams {
  dataBarbershop: BarbershopData;
}
export const createBarbershop = async ({
  dataBarbershop,
}: CreateBarbershopParams) => {
  const { data } = await httpClient.post<CreateBarbershopResponse>(
    `/barbershop`,
    dataBarbershop,
  );

  return data;
};
