import { Barbershop } from "@/app/types/Barbershop";
import { httpClient } from "../htppClient";

interface GetBarbershopByIdResponse {
  barbershop: Barbershop;
}

interface GetBarbershopByIdParams {
  barbershopId: string;
}
export const getBarbershopById = async ({
  barbershopId,
}: GetBarbershopByIdParams) => {
  const { data } = await httpClient.get<GetBarbershopByIdResponse>(
    `/barbershop/${barbershopId}`,
  );
  return data;
};
