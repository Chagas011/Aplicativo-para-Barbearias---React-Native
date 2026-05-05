import { httpClient } from "../htppClient";

interface CreateSchedulingParams {
  barberId: string;
  date: string;
  startTime: string;
}
export const deleteScheduling = async ({
  barberId,
  date,
  startTime,
}: CreateSchedulingParams) => {
  await httpClient.delete(`/scheduling/${barberId}/${date}/${startTime}`);
};
