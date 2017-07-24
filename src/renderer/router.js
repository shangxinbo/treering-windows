import Vue from 'vue'
import Router from 'vue-router'

import layout from './components/layout.vue'
import todo from './components/todos/index.vue'
import add from './components/todos/add.vue'
import register from './components/account/register.vue'

Vue.use(Router)

let mRouter = new Router({
    routes: [
        //{ path: '/', name: 'todo', component: todo }
        //{ path: '/', name: 'add', component: add }
        // {
        //     path: '/',
        //     component: layout,
        //     children:[]
        // },
        { path: '/', name: 'register', component: register }
    ]
})

export default mRouter
