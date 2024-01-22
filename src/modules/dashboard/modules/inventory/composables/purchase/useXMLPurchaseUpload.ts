import { useMutation } from "@tanstack/vue-query";
import axios from "axios";

const uploadXML = async (xml: File): Promise<any> => {
  const { data } = await axios.post("", xml);
  return data;
};

const useXMLPurchaseUpload = () => {
  const uploadXMLMutations = useMutation({ mutationFn: uploadXML });

  return {
    uploadXMLMutations,
  };
};

export default useXMLPurchaseUpload;
