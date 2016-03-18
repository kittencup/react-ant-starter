import {createStore,compose,applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';

const finalCreateStore = compose(
    applyMiddleware(thunk)
)(createStore);

export default function configureStore(initialState = {}) {
    return finalCreateStore(combineReducers(Object.assign({}, reducers)), initialState);
}

