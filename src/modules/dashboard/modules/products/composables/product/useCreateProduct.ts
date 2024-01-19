import { ref } from "vue";

interface product {
  name: string;
  sku: string;
}

const nameError = ref("");
const product = ref<product>({} as product);
const useCreateProduct = () => {
  return {
    product,
    nameError,
  };
};

export default useCreateProduct;
