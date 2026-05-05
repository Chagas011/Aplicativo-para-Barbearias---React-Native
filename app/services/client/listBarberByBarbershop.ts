import { Barber } from "@/app/types/Barber";
import { httpClient } from "../htppClient";

interface ListBarberByBarbershopResponse {
  barber: Barber[];
}

interface ListBarberByBarbershopParams {
  barbershopId: string;
}
export const listBarberByBarbershop = async ({
  barbershopId,
}: ListBarberByBarbershopParams) => {
  const { data } = await httpClient.get<ListBarberByBarbershopResponse>(
    `/barbershop/barbers/${barbershopId}`,
  );

  return data;
};
