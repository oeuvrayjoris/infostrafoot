import { createStore, combineReducers, applyMiddleware } from 'redux'
import playerReducer from './reducers/player'
import thunk from 'redux-thunk'


const reducer = combineReducers({
	playerReducer
})

const store = createStore(
	reducer,
 applyMiddleware(thunk)
 )

export default store