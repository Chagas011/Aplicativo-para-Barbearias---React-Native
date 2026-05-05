import { httpClient } from "../htppClient";

interface DeleteBarberParams {
  barbershopId: string;
  barberId: string;
}
export const deleteBarber = async ({
  barbershopId,
  barberId,
}: DeleteBarberParams) => {
  const { data } = await httpClient.delete(
    `/barber/${barbershopId}/${barberId}`,
  );
  return data;
};
