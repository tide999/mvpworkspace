import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        pageSizeBigOne: true,

    },
    // getters: {
    //     getPageSizeBigOne: state => {
    //         return state.pageSizeBigOne
    //     }
    // },
    mutations: {
        update(state, [key, value]) {
            state[key] = value;
        },
    }
})

export default store