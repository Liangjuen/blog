import request from '../../request'

/**
 * 获取全部分类列表
 * 
 */
const getAllCategoris = () => {
    return request.get<API.CateList>('/categoris')
}

export default {
    getAllCategoris
}