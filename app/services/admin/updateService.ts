import { Service } from "@/app/types/Service";
import { httpClient } from "../htppClient";

interface ServiceData {
  name?: string;
  file?: {
    type: string;
    size: number;
  };
  duration?: number;
  price?: number;
  isActive?: boolean;
}
interface UpdateServicerResponse {
  service: Service;
  fileKey?: string;
  uploadSignature?: string;
}
interface UpdateServiceParams {
  dataService: ServiceData;
  serviceId: string;
  barberId: string;
}
export const updateService = async ({
  dataService,
  serviceId,
  barberId,
}: UpdateServiceParams) => {
  const { data } = await httpClient.put<UpdateServicerResponse>(
    `/service/${barberId}/${serviceId}`,
    dataService,
  );

  return data;
};
