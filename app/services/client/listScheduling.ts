import { Scheduling } from "@/app/types/Scheduling";
import { httpClient } from "../htppClient";

interface ListSchedulingResponse {
  scheduling: Scheduling[];
}

export const listScheduling = async () => {
  const { data } = await httpClient.get<ListSchedulingResponse>(`/scheduling`);

  return data;
};
