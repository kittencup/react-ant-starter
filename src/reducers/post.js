import {FETCH_POST,CREATE_POST_SUCCESS,SET_QUERY,SET_LOADING,RESET_POST_FORM} from '../constants'
import createReducer from '../utils/create-reducer'

const initialState = {
    posts: {
        results: [],
        pagination: {
            pageSize: 20,
            current: 1,
            total: 0
        }
    },
    query: {
        limit: 20,
        page: 1
    },
    loading: false,
    postForm: {}
};

const actionHandlers = {
    [RESET_POST_FORM]: () => {
        return {
            postForm: {}
        }
    },
    [SET_QUERY]: (state, action) => {
        return {
            query: Object.assign({}, state.query, action.query)
        }
    },
    [FETCH_POST]: (state, action) => {
        return {
            posts: Object.assign({}, state.posts, {
                results: action.results,
                pagination: action.pagination
            })
        }
    },
    [CREATE_POST_SUCCESS]: (state, action) => {
        return {
            postForm: action.post
        }
    },
    [SET_LOADING]: (state, action) => {
        return {
            loading: action.value
        }
    }
};

export default createReducer(initialState, actionHandlers);
