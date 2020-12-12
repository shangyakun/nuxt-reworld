<template>
  <div>
    <div class="home-page">
      <div class="banner">
        <div class="container">
          <h1 class="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <div class="feed-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item" v-if="user">
                  <nuxt-link
                    class="nav-link"
                    :class="{
                      active: tab === 'your_feed',
                    }"
                    exact
                    :to="{
                      name: 'home',
                      query: {
                        tab: 'your_feed',
                      },
                    }"
                  >
                    Your Feed
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link
                    class="nav-link"
                    :class="{
                      active: tab === 'global_feed',
                    }"
                    exact
                    :to="{
                      name: 'home',
                    }"
                  >
                    Global Feed
                  </nuxt-link>
                </li>
                <li class="nav-item" v-if="tag">
                  <nuxt-link
                    class="nav-link"
                    :class="{
                      active: tab === 'tag',
                    }"
                    exact
                    :to="{
                      name: 'home',
                      query: {
                        tab: 'tag',
                        tag: tag,
                      },
                    }"
                  >
                    #{{ tag }}
                  </nuxt-link>
                </li>
              </ul>
            </div>
            <template v-if='articles'>
              <div class="article-preview" v-for="(item, index) in articles" :key="index">
                <div class="article-meta">
                  <nuxt-link :to="'/profile/'+item.author.username">
                    <img :src="item.author.image" />
                  </nuxt-link>
                  <div class="info">
                    <nuxt-link class="author" :to="'/profile/'+item.author.username">{{ item.author.username }}</nuxt-link>
                    <span class="date">{{ item.createdAt }}</span>
                  </div>
                  <button
                    @click="favoriteClick(item)"
                    :disabled="item.favoriteDisabled"
                    class="btn btn-outline-primary btn-sm pull-xs-right"
                  >
                    <i class="ion-heart"></i> {{ item.favoritesCount }}
                  </button>
                </div>
                <nuxt-link class="preview-link" :to="'/article/' + item.slug">
                  <h1>{{ item.title }}</h1>
                  <p>{{ item.description }}</p>
                  <span>Read more...</span>
                </nuxt-link>
              </div>
            </template>

            <nav>
              <ul class="pagination">
                <li
                  class="page-item"
                  :class="{
                    active: item === page,
                  }"
                  v-for="item in totalPage"
                  :key="item"
                >
                  <nuxt-link
                    class="page-link"
                    :to="{
                      name: 'home',
                      query: {
                        page: item,
                        tag: $route.query.tag,
                        tab: tab,
                      },
                    }"
                    >{{ item }}</nuxt-link
                  >
                </li>
              </ul>
            </nav>
          </div>
          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>
              <div class="tag-list">
                <nuxt-link
                  v-for="(item, index) in tags"
                  :key="index"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag: item,
                    },
                  }"
                  class="tag-pill tag-default"
                >
                  {{ item }}
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {
  getArticles,
  yourFeedArticles,
  addFavorite,
  unFavorite,
} from "@/api/article";
import { getTags } from "@/api";
export default {
  name: "home",
  async asyncData({ query }) {
    const page = Number.parseInt(query.page || 1);
    const limit = 10;
    const tag = query.tag;
    const tab = query.tab || "global_feed";
    const loadMore = tab === "global_feed" ? getArticles : yourFeedArticles;
    const [articleRes, tagslist] = await Promise.all([
      loadMore({
        limit,
        offset: (page - 1) * limit,
        tag,
      }),
      getTags()
    ]);
    const { articles, articlesCount } = articleRes.data;
    const { tags } = tagslist.data;
    articles.forEach((article) => (article.favoriteDisabled = false));
    return {
      page,
      tag, //文章标签
      limit, //每页文章数量
      tab, //选项卡名称
      articles, //文章信息
      articlesCount, //文章总数量
      tags, //tag列表
    };
  },
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  watchQuery: ["tag", "tab", "page"],
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
  },
};
</script>
<style></style>
