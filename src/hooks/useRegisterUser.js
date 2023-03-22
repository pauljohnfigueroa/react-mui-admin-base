import { useState } from "react";
import { useAuthContext } from './useAuthContext'
import { useUsersContext } from "./useUsersContext";

export const useRegisterUser = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAuthContext()
    const { dispatch } = useUsersContext()

    const registerUser = async (email, name, password, phone, roles) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify({ email, name, password, phone, roles })
        })
        // {email, token}
        const json = await response.json()

        console.log(json)

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {

            const fetchUsers = async () => {
                const response = await fetch(`http://localhost:4000/api/user`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                })
                const users = await response.json()
                // Re-render datagrid
                dispatch({ type: 'users/get', payload: users })
            }

            fetchUsers()

            // save the {email, token} in the localStorage
            localStorage.setItem('user', JSON.stringify(json))
            setIsLoading(false)
        }
    }

    return { registerUser, isLoading, error }
}
