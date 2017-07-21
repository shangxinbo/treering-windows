import Vue from 'vue'
import Router from 'vue-router'

import todo from './components/todos/index.vue'

Vue.use(Router)

let mRouter = new Router({
    routes: [
        { path: '/', name: 'todo', component: todo }
    ]
})

export default mRouter
