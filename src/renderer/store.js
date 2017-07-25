
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
    type: 1,   //1 todo, 2 important
}

const mutations = {
    // 显示遮罩层
    CHANGE_TYPE(state,type) {
        state.type = type
    }
}

export default new Vuex.Store({
    state,
    mutations
})