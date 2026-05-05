import { Barbershop } from "@/app/types/Barbershop";
import { httpClient } from "../htppClient";

interface ListBarbershopResponse {
  barberShop: Barbershop[];
}

export const listBarbershopByAccount = async () => {
  const { data } =
    await httpClient.get<ListBarbershopResponse>("/barbershop/admin");

  return data;
};
