import type { Directive, DirectiveBinding } from 'vue'
const DISTANCE = 75
const DURATION = 1000
const animationMap = new WeakMap()

const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
        if (entry.intersectionRatio > 0) {
            const animation = animationMap.get(entry.target)
            animation.play()
            observer.unobserve(entry.target)
        }
    }
})

function isBelowViewport(el: Element) {
    const rect = el.getBoundingClientRect()
    return rect.top > window.innerHeight
}

export default <Directive>{
    mounted(el: Element, binding: DirectiveBinding) {
        if (!isBelowViewport(el)) {
            return
        }
        // 创建动画
        const animation = el.animate(
            [
                {
                    transform: `translateY(${DISTANCE}px)`,
                    opacity: 0
                },
                {
                    transform: 'translateY(0)',
                    opacity: 1
                }
            ],
            {
                duration: DURATION,
                easing: 'ease'
            }
        )
        // 暂停动画、等待元素进入视口区域
        animation.pause()
        animationMap.set(el, animation)
        observer.observe(el)
    },

    unmounted(el: Element,) {
        observer.unobserve(el)
    }
}