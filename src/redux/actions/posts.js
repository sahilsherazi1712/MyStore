import axios from "axios";
import { CART, POSTS, POSTS_DELETE } from "../../utils/util";
import { apiGet } from "../../utils/utils";


export function getPosts(){
    // return axios.get(POSTS)
    return apiGet(POSTS)
}

export function deletePost(id){
    return axios.delete(POSTS_DELETE + `${id}`)
}

export function getCarts(){
    return apiGet(CART)
}

