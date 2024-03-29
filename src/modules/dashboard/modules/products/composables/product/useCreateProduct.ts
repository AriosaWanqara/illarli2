import { ref } from "vue";

interface product {
  name: string;
  skus: string[];
}

const nameError = ref<string[]>([]);
const product = ref<product>({} as product);
const useCreateProduct = () => {
  return {
    product,
    nameError,
  };
};

export default useCreateProduct;
