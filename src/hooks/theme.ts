import { computed, watch } from 'vue'
import { useIndexStore } from '../stores/index'

type Dark = 'dark'
type Light = 'light'

export default () => {
    // 主题配置
    const indexStore = useIndexStore()
    let themeMode = computed(()=> indexStore.theme)
    
    const themeMedia = window.matchMedia("(prefers-color-scheme: light)")
    const themeHandler = () => {
        if (themeMedia.matches) {
            setHtmlAtt('light')
        } else {
            setHtmlAtt('dark')
        }
    }
    themeMedia.addEventListener('change', themeHandler)
    const setHtmlAtt = (theme: Light | Dark) => {
        document.querySelector('html')?.setAttribute('theme',theme)
    }
    watch(themeMode, (val)=> {
        if(val === 'auto') {
            themeMedia.addEventListener('change', themeHandler)
            themeHandler()
        }else {
            themeMedia.removeListener(themeHandler)
            setHtmlAtt(val as Light | Dark)
        }
    },{
        immediate:true
    })
}