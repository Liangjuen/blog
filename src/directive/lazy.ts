import type { Directive } from 'vue'

let lazy: Directive<HTMLImageElement, string> = async (el, binding) => {
    const observer = new IntersectionObserver((entry) => {
        if (entry[0].intersectionRatio > 0) {
            el.src = binding.value
            observer.unobserve(el)
        } else {
            el.src = 'https://fakeimg.pl/500x200/?text=. . .'
        }
    })
    observer.observe(el)
}

export default lazy