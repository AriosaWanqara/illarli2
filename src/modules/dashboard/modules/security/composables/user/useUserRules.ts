import { required, helpers } from '@vuelidate/validators';

const userRules = {
    email: {
        required
    },
    roles: {
        required
    },
    username: {
        required
    },
    subsidiariesId: {
        required
    },
    checkoutsId: {
        required
    },
    name: {
        required
    }
};

const useUserRules = () => {
    return {
        userRules
    };
};

export default useUserRules;
