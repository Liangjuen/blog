import closePanelDirective from './dirs/closePanel'
import lazy from './dirs/lazy'
import rollIn, { roll } from './dirs/rollIn'

export default (app: { directive: (arg0: string, arg1: {}) => void }) => {
    app.directive('closePanel', closePanelDirective)
    app.directive('lazy', lazy)
    app.directive('rollIn', rollIn)
    app.directive('roll', roll)
}