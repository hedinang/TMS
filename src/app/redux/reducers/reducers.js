import { combineReducers } from 'redux'
function mainTab(state = '', action) {
    switch (action.type) {
        case 'CHANGE':
            return action.text
        default:
            return state
    }
}
const reducer = combineReducers({
    mainTab
})
export default reducer