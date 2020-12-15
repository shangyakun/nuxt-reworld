<template>
    <div>
        <div class="auth-page">
            <div class="container page">
                <div class="row">
                    <div class="col-md-6 offset-md-3 col-xs-12">
                        <h1 class="text-xs-center">Sign up</h1>
                        <p class="text-xs-center">
                            <nuxt-link to="/login" v-if="!isLogin">Have an account?</nuxt-link>
                            <nuxt-link to="/register" v-if="isLogin">Neep an account?</nuxt-link>
                        </p>
                        <ul class="error-messages">
                            <template v-for="(msg,field) in errMsg">
                                <li v-for="(item,index) in msg" :key='index'>{{field}} {{item}}</li>
                            </template>
                        </ul>
                        <form @submit.prevent="submit">
                            <fieldset class="form-group" v-if="!isLogin">
                                <input required class="form-control form-control-lg" v-model="user.username" type="text" placeholder="Your Name">
                            </fieldset>
                            <fieldset class="form-group">
                                <input required class="form-control form-control-lg" v-model="user.email" type="email" placeholder="Email">
                            </fieldset>
                            <fieldset class="form-group">
                                <input minlength="8" required class="form-control form-control-lg" v-model="user.password" type="password" placeholder="Password">
                            </fieldset>
                            <button class="btn btn-lg btn-primary pull-xs-right">
                                {{isLogin ? 'sing in' : 'sing up'}}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { login, register } from '@/api'
//客户端存储,process.client 特殊数据，客户端为true，服务端是false
const Cookie = process.client ? require('js-cookie') :undefined;
export default {
    middleware: 'notAuthenticated',
    name:"login",
    data(){
        return {
            user:{
                username:'',
                email:'',
                password:'',
            },
            errMsg:{}
        }
    },
    computed:{
        isLogin(){
            return this.$route.name === 'login'
        }
    },
    methods:{
        async submit(){
            try {
                let { data } = this.isLogin
                ? await login({
                    user:this.user
                })
                : await register({
                    user:this.user
                });
                //保存登录状态到store
                this.$store.commit('setUser',data.user);
                //持久化，避免刷新登录状态丢失
                Cookie.set('user',data.user)
                //跳转到home
                this.$router.push('/')
            } catch(err){
                this.errMsg = err.response.data.errors;
            }
        }
    }
}
</script>