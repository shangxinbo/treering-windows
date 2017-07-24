import axios from 'axios'
axios.defaults.adapter = require('axios/lib/adapters/http')
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
                    } else if (body.code == 10001) {
                        localStorage.removeItem('user')
                        sessionStorage.clear()
                        window.location.reload()
                    } else if (body.code == 10003) {
                        _this.$router.replace('/initpass')
                    } else if (res.data.code == 10005) {
                        _this.$router.replace('/error?code=403')
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