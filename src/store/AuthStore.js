import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import AuthApi from '@/apis/auth-api'
import http from '@/utils/http-common'

Vue.use(Vuex)

const AuthStore = {
    state: {
        token: localStorage.getItem('user-token') || '',
        status: '',
        user_name: localStorage.getItem('user_name') || '',
        loadingLogin: ''
    },
    getters: {
        isAuthenticated: (state) => {
            return !!state.token
        },
        authStatus: (state) => { 
            return state.status
        },
        getUserName:(state) => {
            return state.user_name
        },
        getLoadingLogin: (state) => {
          return state.loadingLogin
        }
    },
    mutations: {
        AUTH_REQUEST(state) {
            state.status = 'loading'
        },
        SIGNUP_REQUEST(state) {
            state.status = 'loading'
        },
        FILE_UPLOAD_REQUEST(state) {
            state.status = 'loading'
        },
        FORGET_PASSWORD_REQUEST(state) {
            state.status = 'loading'
        },
        FORGET_PASSWORD_REQUEST_CONFIRM(state) {
            state.status = 'loading'
        },
        AUTH_SUCCESS(state, token) {
            state.status = 'success'
            state.token = token
        },
        AUTH_ERROR(state) {
            state.status = 'error'
        },
        SOCIAL_LOGIN(state) {
            state.status = 'loading'
        },
        AUTH_LOGOUT(state){
            state.status = 'loading'
        },
        SET_USER_NAME(state, user_name){
            state.user_name = user_name
        },
        LOGIN_LOADING(state, social_provider) {
          state.loadingLogin = social_provider
        }
    },
    actions: {
        CHECK_LOGIN: ({commit, dispatch}) => {
            return new Promise((resolve, reject) => {
                AuthApi.check_login().then(resp => {
                    resolve(resp)
                })
            })
        },
        GO_TO_LOGIN:({commit, dispatch}) =>{
            router.push('/login')
        },
        USER_REQUEST: () => {
            router.push('/uploads/')
        },
        FORGET_PASSWORD_EMAIL: () => {
            router.push('/forget/password/email/')
        },
        FORGET_PASSWORD_REQUEST: ({commit, dispatch}, user) => {
            console.log('Forget Password');
            return new Promise((resolve, reject) => { // The Promise used for router redirect in login
                commit('FORGET_PASSWORD_REQUEST')

                AuthApi.reset_password(user.email)
                    .then(resp => {
                        dispatch('FORGET_PASSWORD_EMAIL')
                        resolve()
                    })
                    .catch(err => {
                        commit('AUTH_ERROR', err)
                        localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
                        reject()
                    })
            })
        },
        FORGET_PASSWORD_CONFIRM: ({commit, dispatch}, user) => {
            console.log('Forget Password Confirm');
            return new Promise((resolve, reject) => { // The Promise used for router redirect in login
                commit('FORGET_PASSWORD_REQUEST')
                console.log(user.password);
                console.log(user.token);

                AuthApi.reset_password_confirm(user.password, user.token)
                    .then(resp => {
                        dispatch('USER_REQUEST')
                        resolve()
                    })
                    .catch(err => {
                        commit('AUTH_ERROR', err)
                        reject()
                    })
            })
        },
        AUTH_REQUEST: ({commit, dispatch}, user) => {
            return new Promise((resolve, reject) => { // The Promise used for router redirect in login
                commit('AUTH_REQUEST')
                AuthApi.login(user.username, user.password)
                    .then((resp) => {
                        const token = resp.data.token
                        localStorage.setItem('user-token', token) // store the token in localstorage
                        http.defaults.headers.common['Authorization'] = 'JWT ' + token
                        commit('AUTH_SUCCESS', token)
                        // you have your token, now log in your user :)
                        dispatch('USER_REQUEST')
                        resolve()
                    })
                    .catch(err => {
                        commit('AUTH_ERROR', err)
                        localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
                        reject()
                    })
            })
        },
        SIGNUP_REQUEST: ({commit, dispatch}, user) => {
            return new Promise((resolve, reject) => { // The Promise used for router redirect in login
                commit('SIGNUP_REQUEST')
                AuthApi.signup(user.first_name, user.last_name, user.email, user.password)
                    .then(resp => {
                        dispatch('USER_REQUEST');
                        resolve()
                    })
                    .catch(err => {
                        commit('AUTH_ERROR', err);
                        reject()
                    })
            })
        },
        AUTH_LOGOUT({commit, dispatch}) {
            return new Promise((resolve, reject) => {
                console.log("auth logout")
                localStorage.removeItem('user-token') // clear your user's token from localstorage
                localStorage.removeItem('user_name');
                delete http.defaults.headers.Authorization
                commit('AUTH_LOGOUT')
                dispatch('GO_TO_LOGIN')
                resolve()
            })
        },
        SOCIAL_LOGIN: ({commit, dispatch}, user) => {
            localStorage.removeItem('user_name')
            commit('LOGIN_LOADING', user.from)
            return new Promise((resolve, reject) => {
                commit('SOCIAL_LOGIN')
                AuthApi.google_login(user)
                .then(resp => {
                    const token = resp.data.data.token;
                    const user_name = resp.data.data.user_name;
                    localStorage.setItem('user-token', token) // store the token in localstorage
                    localStorage.setItem('user_name', user_name)
                    http.defaults.headers.common['Authorization'] = 'JWT ' + token
                    commit('AUTH_SUCCESS', token)
                    commit('SET_USER_NAME', user_name)
                    // you have your token, now log in your user :)
                    dispatch('USER_REQUEST')
                    commit('LOGIN_LOADING', '')
                    resolve()
                }).catch(err => {
                    commit('AUTH_ERROR', err)
                    commit('LOGIN_LOADING', '')
                    localStorage.removeItem('user-token')
                    reject()
                })
            })
        },
        REFRESH_TOKEN:({commit, dispatch}, token) => {
            return new Promise((resolve, reject) => {
                AuthApi.extend_login(token)
                .then(resp => {
                    const token = resp.data.token;
                    // const user_name = resp.data.user_name;
                    localStorage.setItem('user-token', token)
                    delete http.defaults.headers.Authorization
                    http.defaults.headers.common['Authorization'] = 'JWT ' + token
                    commit('AUTH_SUCCESS', token)
                    // commit('SET_USER_NAME', user_name)
                    // you have your token, now log in your user :)
                    // dispatch('USER_REQUEST')
                    resolve()
                }).catch(err => {
                    commit('AUTH_ERROR', err)
                    commit('LOGIN_LOADING', '')
                    localStorage.removeItem('user-token')
                    reject()
                })
            })
        }
    },
    modules: {}
}

export default AuthStore;

