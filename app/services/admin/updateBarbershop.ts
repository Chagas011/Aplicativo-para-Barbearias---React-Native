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
  name?: string;
  address?: Address;
  phone?: string;
  socialMedia?: SocialMedia[];
  openingHours?: OpeningHours[];
  file?: {
    type: string;
    size: number;
  };
}
interface UpdateBarbershopResponse {
  barberShop: Barbershop;
  fileKey?: string;
  uploadSignature?: string;
}
interface UpdateBarbershopParams {
  dataBarbershop: BarbershopData;
  barbershopId: string;
}
export const updateBarbershop = async ({
  dataBarbershop,
  barbershopId,
}: UpdateBarbershopParams) => {
  const { data } = await httpClient.put<UpdateBarbershopResponse>(
    `/barbershop/${barbershopId}`,
    dataBarbershop,
  );

  return data;
};
