import {FETCH_POST,CREATE_POST_SUCCESS,SET_LOADING,DELETE_POST,SET_QUERY,RESET_POST_FORM} from '../constants'

export function resetPostForm() {
    return {
        type: RESET_POST_FORM
    }
}

export function setLoading(trueOrFalse) {
    return {
        type: SET_LOADING,
        value: trueOrFalse
    }
}
export function setQuery(query) {
    return {
        type: SET_QUERY,
        query: query
    }
}


export function getPosts() {

    return (dispatch, getState)=> {

        let query = getState().post.query;

        dispatch(setLoading(true));

        $.ajax({
                url: 'http://api.wallstcn.com/v2/policies/index',
                dataType: 'jsonp',
                data: query
            })
            .success((data)=> {
                dispatch({
                    type: FETCH_POST,
                    results: data.results,
                    pagination: {
                        total: data.paginator.total,
                        current: query.page,
                        pageSize: query.limit
                    }
                });

                dispatch(setLoading(false));

            });
    }
}

export function createPost(post) {

    return (dispatch)=> {

        dispatch(setLoading(true));

        $.ajax({
                url: 'http://api.wallstcn.com/v2/policies/index',
                dataType: 'jsonp'
            })
            .success((data)=> {

                dispatch({
                    type: CREATE_POST_SUCCESS,
                    post: data.results[0]
                });

                dispatch(setLoading(false));

            });
    }
}


export function deletePost(id) {

    return (dispatch)=> {

        dispatch(setLoading(true));

        $.ajax({
                url: 'http://api.wallstcn.com/v2/policies/index',
                dataType: 'jsonp'
            })
            .success(()=> {
                dispatch(getPosts());
            });
    }
}
