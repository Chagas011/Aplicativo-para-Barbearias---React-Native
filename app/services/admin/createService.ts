import { Service } from "@/app/types/Service";
import { httpClient } from "../htppClient";

interface ServiceData {
  barberId: string;
  name: string;
  duration: number;
  price: number;
  isActive: boolean;
  file?: {
    type: string;
    size: number;
  };
}
interface CreateServiceResponse {
  service: Service;
  fileKey?: string;
  uploadSignature?: string;
}
interface CreateServiceParams {
  dataService: ServiceData;
}
export const createService = async ({ dataService }: CreateServiceParams) => {
  const { data } = await httpClient.post<CreateServiceResponse>(
    `/service`,
    dataService,
  );

  return data;
};
