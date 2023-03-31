const baseURL = {
    dev: 'http://127.0.0.1:8080/api',
    pro: 'http://127.0.0.1:8080/api'
}

export default {
    baseURL: process.env.NODE_ENV === 'development' ? baseURL.dev : baseURL.pro
} 