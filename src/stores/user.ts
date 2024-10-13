import { create } from 'zustand'
import { persist } from 'zustand/middleware'
// import { router } from '../router'
import { toast } from 'sonner'
import { login as apiLogin, getProfile as apiGetProfile } from '@/apis/user'
import { UserProfile } from '@/types/user'

interface UserState {
    user: UserProfile | null
    token: string | null
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    setUser: (user: UserState['user']) => void
    getProfile: () => Promise<UserProfile>
}

export const userStore = create<UserState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            login: async (email, password) => {
                try {
                    const response = await apiLogin(email, password)
                    set({ token: response.accessToken })
                    //获取用户信息
                    await get().getProfile()
                } catch (error: any) {
                    throw error
                }
            },
            logout: () => {
                userStore.persist.clearStorage()
                toast.warning('您已登出')
                setTimeout(() => {
                    window.location.href = '/login'
                }, 500)
            },
            setUser: (user) => {
                set({ user })
            },
            getProfile: async () => {
                try {
                    const profile = await apiGetProfile()
                    set({ user: profile })
                    return profile
                } catch (error: any) {
                    toast.error('获取用户信息失败')
                    throw error
                }
            },
        }),
        {
            name: 'user-storage',
            storage: {
                getItem: (name) => {
                    const str = localStorage.getItem(name)
                    if (!str) return null
                    return JSON.parse(str)
                },
                setItem: (name, value) => {
                    localStorage.setItem(name, JSON.stringify(value))
                },
                removeItem: (name) => {
                    localStorage.removeItem(name)
                },
            },
        }
    )
)
