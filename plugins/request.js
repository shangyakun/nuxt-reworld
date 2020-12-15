import axios from 'axios'
export const request = axios.create({
    baseURL:'https://conduit.productionready.io'
    // baseURL: 'http://realworld.api.fed.lagounews.com'
})
// 插件的上下文对象（query、params、req、res。。。）
export default ({ store }) => {

  // 请求拦截器
  request.interceptors.request.use(function (config) {
    // 判断是否有user，登陆之后设置token
    const { user } = store.state
    //添加判断
    if (user && user.token) {
    //设置token，评论，点赞，follow的时候需要
      config.headers.Authorization = `Token ${user.token}`
    }
    return config
  }, function (error) {
    // 请求失败处理
    return Promise.reject(error)
  })
}
