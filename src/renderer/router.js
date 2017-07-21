import Vue from 'vue'
import Router from 'vue-router'

import todo from './components/todos/index.vue'
import add from './components/todos/add.vue'

Vue.use(Router)

let mRouter = new Router({
    routes: [
        //{ path: '/', name: 'todo', component: todo }
        { path: '/', name: 'add', component: add }
    ]
})

export default mRouter
