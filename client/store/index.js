import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import product from './product'
import products from './products'
import orders from './orders'
import lineitems from './lineitems'

const reducer = combineReducers({
  user,
  product,
  products,
  orders,
  lineitems
})


const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './product'
export * from './products'
export * from './orders'
export * from './lineitems'
