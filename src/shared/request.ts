import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { userStore } from "@/stores/user";
export const request = axios.create({
    baseURL: 'http://localhost:8000/api',
})

request.interceptors.request.use((config) => {
    const token = userStore.getState().token
    if (token) config.headers!['authorization'] = token
    return config
})

request.interceptors.response.use(
    (res: any) => {
        if (res.data.code === 500) {
            console.log(res.data.message)
            throw new Error(res.data.message)
        }
        return res.data.data
    },
    (err: AxiosError) => {
        if (err.response?.status === 401) {
            userStore.getState().logout()
            return new Promise(() => { })
        }
        toast.error((err.response?.data as { message?: string })?.message || '未知错误')
        throw new Error((err.response?.data as { message?: string })?.message || '未知错误')
    }
)