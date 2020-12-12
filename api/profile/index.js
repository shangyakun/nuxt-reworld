
import { request } from '@/plugins/request'
// 0c14ba976197d7ad7a3a7d
export const getProfile = slug => {
    return request({
        url:`/api/profiles/${slug}`,
        method:"GET",
    })
}
