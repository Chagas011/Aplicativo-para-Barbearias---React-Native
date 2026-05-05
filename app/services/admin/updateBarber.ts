import { Barber } from "@/app/types/Barber";
import { httpClient } from "../htppClient";

export type WorkingHours = {
  dayOfWeek: number;
  start: string;
  end: string;
};

interface BarberData {
  name?: string;
  barbershopId?: string;
  workingHours?: WorkingHours[];
  file?: {
    type: string;
    size: number;
  };
}
interface UpdateBarberResponse {
  barber: Barber;
  fileKey?: string;
  uploadSignature?: string;
}
interface UpdateBarberParams {
  dataBarber: BarberData;
  barbershopId: string;
  barberId: string;
}
export const updateBarber = async ({
  dataBarber,
  barbershopId,
  barberId,
}: UpdateBarberParams) => {
  const { data } = await httpClient.put<UpdateBarberResponse>(
    `/barber/${barbershopId}/${barberId}`,
    dataBarber,
  );

  return data;
};
