import { Service } from "@/app/types/Service";
import { httpClient } from "../htppClient";

interface GetServiceByIdResponse {
  service: Service;
}

interface GetServiceByIdParams {
  barberId: string;
  serviceId: string;
}
export const getServiceById = async ({
  barberId,
  serviceId,
}: GetServiceByIdParams) => {
  const { data } = await httpClient.get<GetServiceByIdResponse>(
    `/service/${barberId}/${serviceId}`,
  );
  return data;
};
