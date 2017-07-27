import Vue from 'vue'
import Router from 'vue-router'

import layout from './components/layout.vue'
import todo from './components/todos/index.vue'
import register from './components/account/register.vue'
import login from './components/account/login.vue'
import current from './components/current/index.vue'

Vue.use(Router)

let mRouter = new Router({
    routes: [
        { path: '/login', name: 'login', component: login },
        { path: '/register', name: 'register', component: register },
        { path: '/current', name: 'current', component: current },
        {
            path: '/',
            component: layout,
            children: [
                { path: '/todo/list', name: 'todo', component: todo },
            ]
        },
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
