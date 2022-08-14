import api from "./api";

class AuthService{

    static AutheticateUser(credentials){
        let username = credentials.username
        let password = credentials.password
        let url = 'login/admin/'+ username
        return api.post(url,{ query: { password: password} })
    }

}

export default AuthService; 