export default function(state={}, action){
    switch(action.type){
        case 'GET_REVIEWS':
            return { ...state, reviews: action.payload }
        default:
            return state;
    }
}