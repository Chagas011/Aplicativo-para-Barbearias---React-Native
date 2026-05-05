import { Barber } from "@/app/types/Barber";
import { httpClient } from "../htppClient";

export type WorkingHours = {
  dayOfWeek: number;
  start: string;
  end: string;
};

interface BarberData {
  name: string;
  barbershopId: string;
  workingHours: WorkingHours[];
  file?: {
    type: string;
    size: number;
  };
}
interface CreateBarberResponse {
  barber: Barber;
  fileKey?: string;
  uploadSignature?: string;
}
interface CreateBarberParams {
  dataBarber: BarberData;
}
export const createBarber = async ({ dataBarber }: CreateBarberParams) => {
  const { data } = await httpClient.post<CreateBarberResponse>(
    `/barber`,
    dataBarber,
  );

  return data;
};
