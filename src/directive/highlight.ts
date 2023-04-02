import MarkdownIt  from 'markdown-it'
// highlightjs 核心代码
import hljs from 'highlight.js/lib/core'
// 按需引入语言包
import json from 'highlight.js/lib/languages/json'
import javascript from 'highlight.js/lib/languages/javascript'
import less from 'highlight.js/lib/languages/less'
import sql from 'highlight.js/lib/languages/sql'
import html from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'

hljs.registerLanguage('json', json)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('ts', javascript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('less', less)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('html', html)


//创建v-highlight全局指令
export default (el:Element) => {
    let mdContent = el.innerHTML
    // 配置主题(暂时只考虑使用深色)的类名
    el.className = `markdown-body ${'hljs-atom-one-light'}`

    // 配置 markdown-it 使用的语法高亮插件
    let md:any = new MarkdownIt({
        highlight: function (str, lang) {
            let langIcon = `<i class="lang">${lang}</i>`
            if (lang && hljs.getLanguage(lang) || lang == 'template') {
                console.log(lang);
                
                lang = (lang == 'template'? 'html' : lang)
              try {
                return '<div>'+ langIcon +'<pre class="hljs"><code>' + 
                hljs.highlight(str, {language: lang, ignoreIllegals: true }).value + '</code></pre></div>'
              } catch (__) {}
            }
            return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
          }
    })

    // 生成 html 字符串并挂载到容器
    let html = md.render(mdContent)
    el.innerHTML = html
}

