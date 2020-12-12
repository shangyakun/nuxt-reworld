
import { request } from '@/plugins/request'

export const getArticles = params => {
    return request({
        url:`/api/articles`,
        method:"GET",
        params
    })
}
//获取本人follow的文章列表
export const yourFeedArticles = params => {
    return request({
        url:`/api/articles/feed`,
        method:"GET",
        params
    })
}
//获取文章详情
export const getArticleDetail = slug => {
    return request({
        url:`/api/articles/${slug}`,
        method:"GET",
    })
}
//创建新文章
export const createArticle = data => {
    return request({
        url:`/api/articles`,
        method:"POST",
        data
    })
}
//更新文章
export const updateArticle = data => {
    return request({
        url:`/api/articles/${data.slug}`,
        method:"PUT",
        data:{
            article:data.article
        }
    })
}
//删除文章
export const delArticle = slug => {
    return request({
        url:`/api/articles/${slug}`,
        method:"DELETE",
    })
}
//获取文章对应的评论列表
export const getComments = slug => {
    return request({
        url:`/api/articles/${slug}/comments`,
        method:"GET",
    })
}
//添加评论
export const addComments = data => {
    return request({
        url:`/api/articles/${data.slug}/comments`,
        method:"POST",
        data:{
            comment:data.comment
        }
    })
}
//删除评论

export const delComments = params => {
    return request({
        url:`/api/articles/${params.slug}/comments/${params.id}`,
        method:"DELETE",
    })
}
export const addFavorite = slug => {
    return request({
        url:`/api/articles/${slug}/favorite`,
        method:"POST",
    })
}
export const unFavorite = slug => {
    return request({
        url:`/api/articles/${slug}/favorite`,
        method:"DELETE",
    })
}
export const follow = username => {
    return request({
        url:`/api/profiles/${username}/follow`,
        method:"POST",
    })
}
export const unFollow = username => {
    return request({
        url:`/api/profiles/${username}/follow`,
        method:"DELETE",
    })
}