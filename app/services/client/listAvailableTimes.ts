import { httpClient } from "../htppClient";

interface ListAvailableTimesResponse {
  availableTimes: string[];
}

interface ListAvailableTimesParams {
  barbershopId: string;
  barberId: string;
  serviceId: string;
  date: string;
}
export const listAvailableTimes = async ({
  barbershopId,
  barberId,
  date,
  serviceId,
}: ListAvailableTimesParams) => {
  const { data } = await httpClient.get<ListAvailableTimesResponse>(
    `/scheduling/${barbershopId}/${barberId}/available-times`,
    {
      params: {
        serviceId,
        date,
      },
    },
  );

  return data;
};
