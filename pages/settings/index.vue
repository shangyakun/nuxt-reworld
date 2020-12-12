<template>
    <div>
        <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>
        <form @submit.prevent="submit">
          <fieldset>
              <fieldset class="form-group">
                <input class="form-control" v-model="userInfo.image" type="text" placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" v-model="userInfo.username" type="text" placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" v-model="userInfo.bio" rows="8" placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" v-model="userInfo.email" placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" v-model="userInfo.password" type="password" placeholder="Password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
          </fieldset>
        </form>
        <hr>
        <button class="btn btn-outline-danger" @click="logout">
          Or click here to logout.
        </button>
      </div>
    </div>
  </div>
</div>
    </div>
</template>
<script>
import { user } from '@/api/user'
const Cookie = process.client ? require('js-cookie') :undefined;
export default {
    name:"setting",
    asyncData({store}) {
      const {image,email,username,bio} = store.state.user;
      const userInfo = {
        image,
        email,
        username,
        bio,
        password:''
      };
      return {
        userInfo
      }
    },
    methods:{
      async submit(){
        const {data} = await user({
          user:this.userInfo
        });
        //保存登录状态到store
        this.$store.commit('setUser',data.user);
        //持久化，避免刷新登录状态丢失
        Cookie.set('user',data.user)
        this.$router.push({
          path:'/profile/'+data.user.username,
        })
      },
      logout(){
        Cookie.remove('user');
        this.$store.commit('setUser','');
        this.$router.push({
          name:'home'
        })
      },
    }
}
</script>