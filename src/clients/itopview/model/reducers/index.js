import {combineReducers} from 'redux'

let reducers = combineReducers({
    detailData: function (state = {}, action) {
        console.log("combineReducers2 state ", state)
        console.log("combineReducers2 action ", action)
        if (action && action.type == "Save"){
            return action.payload
        }else {
            return null
        }
    },
})

export default reducers