import { httpClient } from "../htppClient";

interface CreateSchedulingResponse {
  schedulingId: string;
}

interface SchedulingData {
  serviceId: string;
  date: string;
  startTime: string;
}

interface CreateSchedulingParams {
  barbershopId: string;
  barberId: string;
  dataScheduling: SchedulingData;
}
export const createScheduling = async ({
  barbershopId,
  barberId,
  dataScheduling,
}: CreateSchedulingParams) => {
  const { data } = await httpClient.post<CreateSchedulingResponse>(
    `/scheduling/${barbershopId}/${barberId}`,
    dataScheduling,
  );

  return data;
};
