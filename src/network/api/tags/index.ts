import request from '../../request'

/**
 * 获取标签列表
 * 
 */

const getTags = () => request.get<API.TagList>('/tags')

export default {
    getTags
}