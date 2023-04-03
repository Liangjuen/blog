import request from "../../request"

/**
 * 获取文章列表(通过类型)
 * 
 * @param {[API.GetArticleList]} params
 */

const getArticleList = (params: API.GetArticleList) => request.get<API.ArticleData>('/article/list',{ params })

/**
 * 获取首页文章列表
 * 
 * @param {[API.GetArticlesByTypeId]} params 
 */

const getArticleListBYTypeId = (params: API.GetArticlesByTypeId) => request.get<API.ArticleData>('/article/list',{ params })

/**
 * 获取文章详情
 * 
 */
const getArticleDetailByArtId = (params:API.GetArticleContent) => request.get<API.ArticleContent>('/article/content', {params})

export default {
    getArticleList,
    getArticleListBYTypeId,
    getArticleDetailByArtId
}