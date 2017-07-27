
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
    type: 0,   //0 todo, 1 important
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