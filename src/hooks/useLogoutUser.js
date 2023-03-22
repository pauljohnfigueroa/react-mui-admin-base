import { useAuthContext } from "./useAuthContext"

export const useLogoutUser = () => {
    const { dispatch } = useAuthContext()

    const logoutUser = () => {
        // remove the user data from the localStorage
        localStorage.removeItem('user')
        // clear the user state
        dispatch({ type: 'LOGOUT_USER' })
    }

    return { logoutUser }
}