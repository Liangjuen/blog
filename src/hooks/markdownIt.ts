import markdownIt  from 'markdown-it'
// highlightjs 核心代码
import hljs from 'highlight.js/lib/core'
import markdownItAnchor from 'markdown-it-anchor'
// import doc from 'markdown-it-toc-done-right'
// 按需引入语言包
import json from 'highlight.js/lib/languages/json'
import javascript from 'highlight.js/lib/languages/javascript'
import less from 'highlight.js/lib/languages/less'
import sql from 'highlight.js/lib/languages/sql'
import html from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import shell from 'highlight.js/lib/languages/shell'

import type MarkdownIt from 'markdown-it'

hljs.registerLanguage('json', json)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('ts', javascript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('less', less)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('html', html)
hljs.registerLanguage('shell', shell)

interface Doc {
    title: string, 
    slug: string
}
interface MorkDownItRes {
    htmlStr: string,
    docs: Doc[]
}
export type Lang = 'json' | 'js' | 'ts' | 'css' | 'less' | 'sql' | 'html' | 'template' | 'shell' | 'vue'
//创建v-highlight全局指令
export default (mdContent:string): MorkDownItRes => {
    let docs: Doc[] = []
    // 配置 markdown-it 
    let md:MarkdownIt = new markdownIt({
        linkify: true,
        // 使用的语法高亮插件
        highlight: (str: string, lang: string)=> {
            let langIcon = `<span class="lang">${lang}</span>`
            if (lang && hljs.getLanguage(lang) || lang == 'template' || lang == 'vue') {
                switch (lang) {
                    case 'template':
                        lang = 'html'
                        break
                    case 'vue': 
                        lang = 'html'
                        break
                    default:
                        break
                }
                try {
                    return '<div>'+ langIcon +'<pre class="hljs"><code>' + 
                    hljs.highlight(str, {language: lang, ignoreIllegals: true }).value + '</code></pre></div>'
                } catch (__) {}
            }
            return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
        }
    }) // 使用添加锚点链接插件
    .use(markdownItAnchor, { 
        level: [2,3],
        slugify: (title: string) =>  title.trim(),
        callback: (html,ast) => {
            docs.push(ast)
        }
    })
    
    // 生成 html 字符串并挂载到容器
    let htmlStr = md.render(mdContent)
    return {
        htmlStr,
        docs
    }
}

