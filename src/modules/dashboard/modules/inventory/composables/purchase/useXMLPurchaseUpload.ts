import api from "@/api/axios";
import { useMutation } from "@tanstack/vue-query";
import type { XMLUploadApiResponse } from "../../models/ApiResponse";
import type { AxiosRequestConfig } from "axios";
import type { Purchases2 } from "../../models/Purchases";

const uploadXML = async (xml: any): Promise<Purchases2> => {
  var formdata = new FormData();
  formdata.append("xml", xml);

  var requestOptions: AxiosRequestConfig = {
    method: "POST",
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const { data } = await api.post<XMLUploadApiResponse>(
    "/general/import/invoice",
    formdata,
    requestOptions
  );
  return data.data;
};

const useXMLPurchaseUpload = () => {
  const uploadXMLMutations = useMutation({ mutationFn: uploadXML });

  return {
    uploadXMLMutations,
  };
};

export default useXMLPurchaseUpload;
