import { required, helpers } from '@vuelidate/validators';

const wareHouseRules = {
    name: {
        required: helpers.withMessage('El nombre es requerido', required)
    },
    address: {
        required: helpers.withMessage('La direccion es requerida', required)
    },
    subsidiary_id: {
        required: helpers.withMessage('La sucursal es requerida', required)
    },
    code: {
        required: helpers.withMessage('El codigo es requerido', required)
    }
};

const useWareHouseRules = () => {
    return {
        wareHouseRules
    };
};

export default useWareHouseRules;
