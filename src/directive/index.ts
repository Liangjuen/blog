
import closePanelDirective from './closePanel'

export default (app: { directive: (arg0: string, arg1: {}) => void }) => {
    app.directive('closePanel', closePanelDirective)
}