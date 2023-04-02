
import closePanelDirective from './closePanel'
import highlightDirective from './highlight'
export default (app: { directive: (arg0: string, arg1: {}) => void }) => {
    app.directive('closePanel', closePanelDirective)
    app.directive('highLight', highlightDirective)
}