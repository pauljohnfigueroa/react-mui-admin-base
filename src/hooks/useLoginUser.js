import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from './useAuthContext'


export const useLoginUser = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const initialFormValues = {
        email: '',
        password: ''
    }

    // set where to redirect user after successful login
    // const navigate = useNavigate()
    // const location = useLocation()
    // const fromLoc = location.state?.from?.pathname || '/dashboard'

    const loginUser = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        // {email, token}
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            // save the {email, token} in the local storage
            localStorage.setItem('user', JSON.stringify(json))

            // Login action
            dispatch({ type: 'auth/login', payload: json })
            setIsLoading(false)

            // if login is successfull, redirect user
            // if (json.token) {
            //     navigate(fromLoc, { replace: true })
            // }
        }
    }

    return { loginUser, isLoading, error, initialFormValues }
}
