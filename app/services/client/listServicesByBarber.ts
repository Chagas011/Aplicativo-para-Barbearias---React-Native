import { Service } from "@/app/types/Service";
import { httpClient } from "../htppClient";

interface ListServicesByBarberResponse {
  service: Service[];
}

interface ListBarberByBarbershopParams {
  barberId: string;
}
export const listServicesByBarber = async ({
  barberId,
}: ListBarberByBarbershopParams) => {
  const { data } = await httpClient.get<ListServicesByBarberResponse>(
    `/barbershop/${barberId}/services`,
  );
  return data;
};
