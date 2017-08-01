


const PRE = process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : 'http://47.93.188.36:3000'
export default {
    install(Vue, options) {
        Vue.prototype.$api = {
            login: PRE + '/login',
            register: PRE + '/register',
            current: PRE + '/current',
            history_add: PRE + '/history/add',
            history_list: PRE + '/history/list',
            todos_create: PRE + '/todos/create',
            todos_list: PRE + '/todos/list',
            todos_save: PRE + '/todos/saveChange',
            backup_view: PRE + '/memo/view',
            backup_save: PRE + '/memo/save',
            verifypass:PRE + '/verifypass'
        }
    }
}