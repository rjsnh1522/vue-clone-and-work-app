import http from '@/utils/http-common'
import '@/utils/auth-header'

export default class AuthApi {
    static login (username, password) {
        if (username) {
            return http.post('backend/auth/obtain_token/', {'username': username, 'password': password})
        }
    }
    static extend_login(old_token) {
        return http.post('backend/auth/refresh_token/', {'token': old_token})
    }
    static signup (first_name, last_name, email, password) {
        return http.post('backend/signup/', {'first_name': first_name, 'last_name': last_name, 'email': email, 'password': password})
    }
    static reset_password (email) {
        if (email) {
            return http.post('backend/reset_password/', {'email': email})
        }
    }
    static reset_password_confirm (password, token) {
        if (password && token) {
            return http.post('backend/reset_password/confirm/', {'password': password,'token':token})
        }
    }
    static logout () {
    }
    static check_login () {
        return http.get('/backend/api/rules/')
    }
    static google_login(user){
        return  http.post('/backend/auth/login-api/', {'user': user})
    }
    static get_current_user(){
        return http.get('/backend/auth/get-current-user')
    }
}
