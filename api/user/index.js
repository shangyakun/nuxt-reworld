
import { request } from '@/plugins/request'

export const user = data => {
    return request({
        url:'/api/user',
        method:"PUT",
        data
    })
}
