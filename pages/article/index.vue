<template>
  <div>
    <div class="article-page">
      <div class="banner">
        <div class="container">
          <h1>{{ article.title }}</h1>

          <div class="article-meta">
            <nuxt-link :to="'/profile/'+article.author.username">
              <img :src="article.author.image" />
            </nuxt-link>
            <div class="info">
              <nuxt-link :to="'/profile/'+article.author.username" class="author">{{
                article.author.username
              }}</nuxt-link>
              <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
            </div>

            <span v-if="user.username === article.author.username">
              <nuxt-link
                class="btn btn-outline-secondary btn-sm"
                :to="{
                  path: '/edit/' + article.slug,
                }"
              >
                <i class="ion-edit"></i> Edit Article
              </nuxt-link>
              <button 
              @click="delArticle(article)"
              class="btn btn-outline-danger btn-sm"
              :class='{disabled:article.delDisabled}'
              >
                <i class="ion-trash-a"></i> Delete Article
              </button>
            </span>
            <span v-else>
              <button
                class="btn btn-sm btn-outline-secondary"
                :disabled="article.followDisabled"
                @click="followed(article)"
              >
                <i class="ion-plus-round"></i>
                &nbsp;
                {{ article.author.following ? "Unfollow" : "Follow" }}
                {{ article.author.username }}
              </button>
              &nbsp;&nbsp;
              <button
                class="btn btn-sm"
                @click="favoriteClick(article)"
                :disabled="article.favoriteDisabled"
                :class="[article.favorited ? 'btn-primary' : 'btn-outline-primary']"
              >
                <i class="ion-heart"></i>
                &nbsp; Favorite Post
                <span class="counter">({{ article.favoritesCount }})</span>
              </button>
            </span>
          </div>
        </div>
      </div>

      <div class="container page">
        <div class="row article-content">
          <div class="col-xs-12">
            <div>
              <div v-html="article.body" class="ng-binding">
                <p>me quiero to corazon</p>
              </div>
            </div>

            <ul class="tag-list">
              <li
                class="tag-default tag-pill tag-outline"
                v-for="(item, index) of article.tagList"
                :key="index"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <hr />

        <div class="article-actions">
          <div class="article-meta">
            <nuxt-link :to="'/profile/'+article.author.username">
              <img :src="article.author.image" />
            </nuxt-link>
            <div class="info">
              <nuxt-link :to="'/profile/'+article.author.username" class="author">{{
                article.author.username
              }}</nuxt-link>
              <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
            </div>
            <span v-if="user.username === article.author.username">
              <nuxt-link
                class="btn btn-outline-secondary btn-sm"
                :to="{
                  path: '/edit/' + article.slug,
                }"
              >
                <i class="ion-edit"></i> Edit Article
              </nuxt-link>
              <button
                @click="delArticle(article)"
                :class='{disabled:article.delDisabled}'
                class="btn btn-outline-danger btn-sm"
              >
                <i class="ion-trash-a"></i> Delete Article
              </button>
            </span>
            <span v-else>
              <button
                class="btn btn-sm btn-outline-secondary"
                :disabled="article.followDisabled"
                @click="followed(article)"
              >
                <i class="ion-plus-round"></i>
                &nbsp;
                {{ article.author.following ? "Unfollow" : "Follow" }}
                {{ article.author.username }}
              </button>
              &nbsp;&nbsp;
              <button
                class="btn btn-sm"
                @click="favoriteClick(article)"
                :disabled="article.favoriteDisabled"
                :class="[article.favorited ? 'btn-primary' : 'btn-outline-primary']"
              >
                <i class="ion-heart"></i>
                &nbsp; Favorite Post
                <span class="counter">({{ article.favoritesCount }})</span>
              </button>
            </span>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-md-8 offset-md-2">
            <form class="card comment-form" @submit.prevent="postComment">
              <div class="card-block">
                <textarea
                  class="form-control"
                  v-model="commentBody"
                  placeholder="Write a comment..."
                  rows="3"
                ></textarea>
              </div>
              <div class="card-footer">
                <img :src="user.image" class="comment-author-img" />
                <button class="btn btn-sm btn-primary">Post Comment</button>
              </div>
            </form>

            <!-- <div class="card">
          <div class="card-block">
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          </div>
          <div class="card-footer">
            <a href="" class="comment-author">
              <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
            </a>
            &nbsp;
            <a href="" class="comment-author">Jacob Schmidt</a>
            <span class="date-posted">Dec 29th</span>
          </div>
        </div> -->
            <div class="card" v-for="(item, index) in comments" :key="index">
              <div class="card-block">
                <p class="card-text" v-html="item.body"></p>
              </div>
              <div class="card-footer">
                <nuxt-link class="comment-author" :to="'/profile/'+article.author.username">
                  <img :src="item.author.image" class="comment-author-img" />
                </nuxt-link>
                &nbsp;
                <nuxt-link :to="'/profile/'+article.author.username" class="comment-author">{{
                  item.author.username
                }}</nuxt-link>
                <span class="date-posted">{{ item.createdAt | date('MMM DD, YYYY') }}</span>
                <span class="mod-options" v-if="user.username === item.author.username">
                  <!-- <i class="ion-edit"></i> -->
                  <i class="ion-trash-a" @click="delComments(item)"></i>
                </span>
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
  getArticleDetail,
  getComments,
  addComments,
  delComments,
  addFavorite,
  unFavorite,
  delArticle,
  follow,
  unfollow,
} from "@/api/article";
import MarkdownIt from 'markdown-it'
export default {
  name: "article",
  data() {
    return {
      commentBody: "",
      favoriteDisabled: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  async asyncData({ params }) {
    const [articleRes, commentsRes] = await Promise.all([
      getArticleDetail(params.slug),
      getComments(params.slug),
    ]);
    const { article } = articleRes.data;
    const { comments } = commentsRes.data;
    article.favoriteDisabled = false;
    article.followDisabled = false;
    article.delDisabled = false;
    const md = new MarkdownIt();
    article.body = md.render(article.body);
    return {
      article,
      comments,
    };
  },
  methods: {
    async postComment() {
      await addComments({
        slug: this.$route.params.slug,
        comment: {
          body: this.commentBody,
        },
      });
      const { data } = await getComments(this.$route.params.slug);
      this.commentBody = "";
      const { comments } = data;
      this.comments = comments;
    },
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
    //	删除评论
    async delComments(item) {
      await delComments({
        slug: this.$route.params.slug,
        id: item.id,
      });
      const { data } = await getComments(this.$route.params.slug);
      const { comments } = data;
      this.comments = comments;
    },
    //follow /  unfollow
    async followed(article) {
      article.followDisabled = true;
      if (!article.author.following) {
        await follow(article.author.username);
        article.followDisabled = false;
        article.author.following = true;
      } else {
        await follow(article.author.username);
        article.followDisabled = false;
        article.author.following = false;
      }
    },
    async delArticle(article) {
      article.delDisabled = true;
      await delArticle(article.slug);
      this.$router.push("/");
    },
  },
};
</script>
