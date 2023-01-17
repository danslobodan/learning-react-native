import createDataContext from "./createDataContext";

const blogReducer = (state, action) => {
    switch(action.type) {
        case 'create_blogpost':
            return [...state, 
            { 
                id: Math.floor(Math.random() * 99999), 
                title: action.payload.title,
                content: action.payload.content
            }];
        case 'edit_blogpost':
            return state;
        case 'delete_blogpost':
            return state.filter((blogPost) => blogPost.id != action.payload);
        default:
            return state;
    }
}

const createBlogPost = (dispatch) => {
    return (title, content, callback) => {
        dispatch({ type: 'create_blogpost', payload: { title, content } });
        callback();
    }
}

const editBlogPost = (dispatch) => {
    return (id, title, content, callback) => {
        dispatch({ type: 'edit_blogpost', payload: { id, title, content }});
        callback();
    }
}

const deleteBlogPost = (dispatch) => {
    return (id) => {
        dispatch({ type: 'delete_blogpost', payload: id });
    }
}

export const { Context, Provider } = createDataContext(
    blogReducer,  
    { createBlogPost, editBlogPost, deleteBlogPost }, 
    [
        { id: 1, title: 'test post', content: 'test content' }
    ]
);