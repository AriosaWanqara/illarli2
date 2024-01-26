import { ref } from "vue";
import type { Service } from "../../models/Service";
import api from "@/api/axios";
import { useQuery } from "@tanstack/vue-query";

const services = ref<Service[]>([]);

const fetchServices = async (): Promise<any> => {
  const { data } = await api.get("");
  return data.data;
};

const useServices = () => {
  const { data, isError, isFetching } = useQuery({
    queryFn: fetchServices,
    queryKey: ["product-services"],
  });

  return {
    servicesHasError: isError,
    isServiceLoading: isFetching,
    services,
  };
};

export default useServices;
