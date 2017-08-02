import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let mRouter = new Router({
    routes: [
        { path: '/login', name: 'login', component: require('@/components/account/login') },
        { path: '/register', name: 'register', component: require('@/components/account/register') },
        { path: '/current', name: 'current', component: require('@/components/current/index') },
        {
            path: '/',
            component: require('@/components/layout'),
            children: [
                { path: '/todo/list', name: 'todo', component: require('@/components/todos/index') },
                { path: '/history', name: 'history', component: require('@/components/history/index') },
                { path: '/backup', name: 'backup', component: require('@/components/backup/index') },
            ]
        },
        {
            path: '*',
            redirect: '/login'
        }
    ]
})


mRouter.beforeEach((to, from, next) => {
    const path = to.path
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user && path != '/login' && path != '/register') {
        next({ path: '/login' })
    } else if (path == '/') {
        next({ path: '/todo/list' })
    } else {
        next()
    }
})


export default mRouter
