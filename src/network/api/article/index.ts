import request from "../../request"

/**
 * 获取文章列表(通过类型)
 * 
 * @param {[API.GetArticlesByTypeId]} params
 */

const getArticleListByTypeId = (params: API.GetArticlesByTypeId) => request.get<API.ArticleData>('/article/list', { params })

/**
 * 获取首页文章列表
 * 
 * @param {[API.GetArticleList]} params 
 */

const getArticleTopList = (params: API.GetArticleList) => request.get<API.ArticleData>('/article/toplist', { params })

/**
 * 获取文章详情
 * 
 */
const getArticleDetailByArtId = (params: API.GetArticleContent) => request.get<API.ArticleContent>('/article/content', { params })

/*
* 获取文章信息
*
*/
const getArticleById = (params: API.GetArticle) => request.get<API.Article>('/article', { params })

export default {
    getArticleListByTypeId,
    getArticleTopList,
    getArticleDetailByArtId,
    getArticleById
}