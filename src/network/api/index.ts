import articleApi from './article/index'
import TagApi from './tags/index'
import CategoryApi from './categoris'
export default {
    ...articleApi,
    ...TagApi,
    ...CategoryApi
}
