import { Barber } from "@/app/types/Barber";
import { httpClient } from "../htppClient";

interface GetBarberByIdResponse {
  barber: Barber;
}

interface GetBarberByIdParams {
  barberId: string;
  barbershopId: string;
}
export const getBarberById = async ({
  barberId,
  barbershopId,
}: GetBarberByIdParams) => {
  const { data } = await httpClient.get<GetBarberByIdResponse>(
    `/barber/${barbershopId}/${barberId}`,
  );
  return data;
};
