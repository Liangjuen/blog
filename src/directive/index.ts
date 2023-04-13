import closePanelDirective from './closePanel'
import lazy from './lazy'

export default (app: { directive: (arg0: string, arg1: {}) => void }) => {
    app.directive('closePanel', closePanelDirective)
    app.directive('lazy', lazy)
}