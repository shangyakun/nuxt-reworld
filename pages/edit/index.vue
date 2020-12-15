<template>
  <div>
    <div class="editor-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-10 offset-md-1 col-xs-12">
            <form @submit.prevent="submit">
              <fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    v-model="article.title"
                    class="form-control form-control-lg"
                    placeholder="Article Title"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    v-model="article.description"
                    class="form-control"
                    placeholder="What's this article about?"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                    class="form-control"
                    rows="8"
                    v-model="article.body"
                    placeholder="Write your article (in markdown)"
                  ></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input type="text" class="form-control" @keyup.enter.prevent="enterTag($event)" placeholder="Enter tags" />
                  <div class="tag-list">
                    <span v-for="(item,index) in article.tagList" :key='index' class="tag-default tag-pill ng-binding ng-scope">
                      <i class="ion-close-round" @click="removeTag(index)"></i>
                      {{item}}
                    </span>
                  </div>
                </fieldset>
                <button class="btn btn-lg pull-xs-right btn-primary">
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createArticle, updateArticle, getArticleDetail } from "@/api/article";
export default {
  middleware: 'authenticated',
  name: "edit-create",
  async asyncData({ params }) {
    if (params.slug) {
      const { data } = await getArticleDetail(params.slug);
      const { article } = data;
      return {
        article,
      };
    }
    return {
      article: {
        body: "",
        title: "",
        tagList: [],
        description: "",
      },
    };
  },
  methods: {
    enterTag(e){
      e.preventDefault();
      if(e.target.value){
        this.article.tagList.push(e.target.value);
        e.target.value = '';
      };
      return false;
    },
    removeTag(i){
      this.article.tagList.splice(i,1)
    },
    async submit() {
      try {
        const { data } = this.$route.params.slug ? await updateArticle({
          article: this.article,
          slug:this.$route.params.slug
        }) : 
        await createArticle({
          article: this.article,
        });
        const { article } = data;
        this.$router.push({
          path: "/article/" + article.slug,
        });
        return false;
      } catch (err) {
        this.errMsg = err.response.data.errors;
      }
    },
  },
};
</script>
