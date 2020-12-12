const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
    return {
        user:null
    }
}
export const mutations = {
    setUser(state,user){
        state.user = user;
    }
}
export const actions = {
    //服务端渲染使用，特殊的action
    nuxtServerInit ({ commit }, { req }) {
        let user = null
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
          try {
            user = JSON.parse(parsed.user)
          } catch (err) {
            // No valid cookie found
          }
        }
        commit('setUser', user)
      }
}