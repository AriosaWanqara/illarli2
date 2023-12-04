import { required, helpers } from '@vuelidate/validators';

const rolRules = {
    name: {
        required
    },
    permissions: {
        required
    }
};

const useRolRules = () => {
    return {
        rolRules
    };
};

export default useRolRules;
