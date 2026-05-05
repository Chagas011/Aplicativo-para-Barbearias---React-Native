import { Barbershop } from "@/app/types/Barbershop";
import { httpClient } from "../htppClient";

interface ListBarbershopResponse {
  barberShop: Barbershop[];
}

export const listBarbershop = async () => {
  const { data } = await httpClient.get<ListBarbershopResponse>("/barbershop");

  return data;
};
