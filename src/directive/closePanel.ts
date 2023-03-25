import type { Directive, DirectiveBinding } from 'vue'

export interface ClosePanelDirOpt {
    close: Function,
    excludeNode?: Element
}

export default <Directive> {
    mounted(el:Element, binding: DirectiveBinding) {
        const handleClose = (e: { target: Node | null }) => {
            if(!el.contains(e.target) && binding.value.excludeNode !== e.target) binding.value.close()
        }
        binding.value._vueDocumentClick = handleClose
        document.addEventListener('click', binding.value._vueDocumentClick, false)
    },

    beforeUnmount(el: Element, binding: DirectiveBinding) {
        document.removeEventListener('click', binding.value._vueDocumentClick)
        delete binding.value._vueDocumentClick
    },
}