import api from "./api";

class AuthService{

    static AutheticateUser(credentials){
        let url = 'login'
        return api.post(url,credentials)
    }

}

export default AuthService; 