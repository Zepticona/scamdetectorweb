import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const userStore = (set) => ({
    isAuth: false,
    user: {},
    addUser: (user) => {
        set((state) => ({
            isAuth: true,
            user: user,
        }))
    },
    removeUser: () => {
        set((state) => ({
            isAuth: false,
            user: {},
        }))
    }
})
const useUserStore = create(
    devtools(
        persist(userStore, {
            name: "user"
        })
    )
)
export default useUserStore;