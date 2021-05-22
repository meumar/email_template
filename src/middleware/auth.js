import config from '@/config/app'
import store from '@/store'

export default {

    guest(to, from, next) {
        var authData = JSON.parse(localStorage.getItem(config.APP_VERSION))
        var isAuthenticated = authData && authData.auth ? authData.auth.authenticationStatus : false
        next(!isAuthenticated ? true : { name: "home" })

    },

    user(to, from, next) {

        let authDetails = store.getters['auth/getAuthenticationDetails']
        let accessToken = authDetails && authDetails['access_token'] ? authDetails['access_token'] : null
        var isAuthenticated = accessToken ? true : false
        next(isAuthenticated ? true : {
            path: '/login',
            query: {
                redirect: to.name
            }
        })
    }


}