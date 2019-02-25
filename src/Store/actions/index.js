import axios from 'axios';
const URL = `https://jsonplaceholder.typicode.com/`;

export async function getReviews(){
    
        const req = await axios.get(`${URL}posts`).then(response => response.data);
        return {
            type: 'GET_REVIEWS',
            payload: req,
        }
    
}