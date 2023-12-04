import api from "@/api/axios";
import type { Dropdown } from "@/models/Dropdown";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { DocumentTypeApiResponse } from "../../models/ApiResponse";
import type { DocumentType } from "../../models/DocumentType";

const documentTypeDropdown = ref<Dropdown[]>([]);

const fetchDocumentsType = async (): Promise<DocumentType[]> => {
  const { data } = await api.get<DocumentTypeApiResponse>(
    "/general/document-type"
  );
  return data.data;
};

const useDocumentTypes = () => {
  const { isError, isFetching, data } = useQuery({
    queryKey: ["config-document-type"],
    queryFn: fetchDocumentsType,
  });

  watch(data, () => {
    if (data.value) {
      documentTypeDropdown.value = [];
      data.value.map((x) => {
        documentTypeDropdown.value.push({
          label: x.key,
          value: x.value,
        });
      });
    }
  });

  return {
    documentTypeDropdown,
    isDocumentsTypeLoading: isFetching,
    documentsTypeHasError: isError,
  };
};

export default useDocumentTypes;
