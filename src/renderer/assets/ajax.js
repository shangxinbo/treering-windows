import axios from 'axios'
import tough from 'tough-cookie'

axios.defaults.adapter = require('axios/lib/adapters/http')
axios.defaults.withCredentials = true

let cookiejar = new tough.CookieJar()
let Cookie = tough.Cookie

axios.interceptors.request.use(function (config) {
    cookiejar.getCookies(config.url, function (err, cookies) {
        config.headers.cookie = cookies.join('; ')
    })
    return config
})

axios.interceptors.response.use(function (response) {
    if (response.headers['set-cookie'] instanceof Array) {
        response.headers['set-cookie'].forEach(function (c) {
            cookiejar.setCookie(Cookie.parse(c), response.config.url, function (err, cookie) { })
        })
    }
    return response
})


export default {
    install(Vue, options) {
        Vue.prototype.$ajax = function (options) {
            let _this = this //实例
            axios({
                url: options.url,
                method: 'post',
                data: options.data
            }).then(res => {
                if (res.status == 200) {
                    let body = res.data
                    if (body.code == 404 || body.code == 403 || body.code == 500) {
                        _this.$router.replace('/error?code=' + body.code)
                    } else {
                        if (options.success) {
                            options.success(body)
                        }
                    }
                } else {
                    _this.$router.replace('/error?code=' + res.status + '&msg=' + res.statusText)
                }
            }).catch(err => {
                if (options.error) options.error(err)
            })
        }
    }
}