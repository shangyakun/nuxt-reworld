import {request} from '@/plugins/request'
export const login = data => {
    return request({
        url:'/api/users/login',
        method:"POST",
        data
    })
}
export const register = data => {
    return request({
        url:'/api/users',
        method:"POST",
        data
    })
}
export const user = data => {
    return request({
        url:'/api/user',
        method:"PUT",
        data
    })
}
export const getProfile = username => {
    
    return request({
        url:`/api/profiles/${username}`,
        method:"GET",
        data
    })
}
export const follow = username => {
    return request({
        url:`/api/profiles/${username}/follow`,
        method:"POST",
        data
    })
}
export const unFollow = username => {
    return request({
        url:`/api/profiles/${username}/follow`,
        method:"DELETE",
        data
    })
}

export const getTags = () => {
    return request({
        url:'/api/tags',
        method:"GET"
    })
}