<template>
  <div>
    <div class="profile-page">
      <div class="user-info">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1" v-if="profile">
              <img :src="profile.image" class="user-img" />
              <h4>{{ profile.username }}</h4>
              <p>
                {{ profile.bio }}
              </p>
              <button
                v-if="user.username === profile.username"
                class="btn btn-sm btn-outline-secondary action-btn"
                @click="$router.push('/settings')"
              >
                <i class="ion-gear-a"></i>
                &nbsp; Edit Profile Settings
              </button>
              <button 
              :disabled="profile.followDisabled" 
              v-else 
              class="btn btn-sm btn-outline-secondary action-btn" 
              @click="followed(profile)"
              >
                <i class="ion-plus-round"></i>
                

                &nbsp;  {{ profile.following ? "Unfollow" : "Follow" }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <div class="articles-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <nuxt-link
                    class="nav-link"
                    :to="{
                      name: 'profile',
                    }"
                    :class="{ active: tab === 'author' }"
                    exact
                  >
                    My Articles
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link
                    :to="{
                      name: 'profile',
                      query: {
                        tab: 'favorites',
                      },
                    }"
                    class="nav-link"
                    :class="{ active: tab === 'favorites' }"
                    exact
                  >
                    Favorited Articles
                  </nuxt-link>
                </li>
              </ul>
            </div>

            <div
              class="article-preview"
              v-for="(article, index) in articles"
              :key="index"
            >
              {{ article.slug }}
              <div class="article-meta">
                <nuxt-link :to="'/profile/' + article.author.username"
                  ><img :src="article.author.image"
                /></nuxt-link>
                <div class="info">
                  <nuxt-link :to="'/profile/' + article.author.username">{{
                    article.author.username
                  }}</nuxt-link>
                  <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
                </div>
                <!-- <button class="btn btn-outline-primary btn-sm pull-xs-right">
                  <i class="ion-heart"></i> {{ article.favoritesCount }}
                </button> -->
                <button
                  @click="favoriteClick(article)"
                  :disabled="article.favoriteDisabled"
                  class="btn btn-outline-primary btn-sm pull-xs-right"
                >
                  <i class="ion-heart"></i> {{ article.favoritesCount }}
                </button>
              </div>
              <nuxt-link class="preview-link" :to="'/article/' + article.slug">
                <h1>{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <span>Read more...</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getArticles,
  addFavorite, 
  unFavorite,
  follow,
  unfollow, 
} from "@/api/article";
import { getProfile } from "@/api/profile";
import { mapState } from "vuex";
export default {
  name: "profile",
  middleware: 'authenticated',
  computed: {
    ...mapState(["user"]),
  },
  async asyncData({ query, params }) {
    const tab = query.tab || "author";
    const data =
      tab === "author"
        ? {
            limit: 5,
            offset: 0,
            author: params.slug,
          }
        : {
            limit: 10,
            offset: 0,
            favorited: params.slug,
          };
    const [profileRes, articleRes] = await Promise.all([
      getProfile(params.slug),
      getArticles(data),
    ]);
    const { profile } = profileRes.data;
    const { articles } = articleRes.data;
    profile.followDisabled = false;
    articles.forEach((article) => (article.favoriteDisabled = false));
    console.log(profile)
    return {
      tab,
      profile,
      articles,
    };
  },
  watchQuery: ["tab"],
  methods: {
    async favoriteClick(article) {
      if (!this.user) {
        this.$router.push({
          name: "register",
        });
        return;
      }
      article.favoriteDisabled = true;
      if (!article.favorited) {
        await addFavorite(article.slug);
        article.favoriteDisabled = false;
        article.favoritesCount += 1;
        article.favorited = true;
      } else {
        await unFavorite(article.slug);
        article.favoriteDisabled = false;
        article.favoritesCount -= 1;
        article.favorited = false;
      }
    },
    async followed(profile) {
      profile.followDisabled = true;
      if (!profile.following) {
        await follow(profile.username);
        profile.followDisabled = false;
        profile.following = true;
      } else {
        await follow(profile.username);
        profile.followDisabled = false;
        profile.following = false;
      }
    },
  },
};
</script>
