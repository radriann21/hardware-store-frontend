import { axiosClient } from "@/shared/api/axiosClient";
import type { MeasureFormValues } from "@/features/measures/validation/measure.validation";
import type { Measure } from "@/features/measures/interfaces/interfaces";

export const measureApi = {
  createMeasure: async (data: MeasureFormValues) => {
    const response = await axiosClient.post("/measures", data);
    return response.data;
  },
  getAllMeasures: async (): Promise<Measure[]> => {
    const response = await axiosClient.get("/measures");
    return response.data;
  },
  deleteMeasure: async (id: string) => {
    const response = await axiosClient.delete(`/measures/delete/${id}`)
    return response.data
  },
  editMeasure: async (id: string, data: Partial<MeasureFormValues>) => {
    const response = await axiosClient.patch(`/measures/update/${id}`, data)
    return response.data
  }
}