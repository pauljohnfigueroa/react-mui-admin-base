import {
    createContext, useEffect, useReducer
} from "react";


export const AuthContext = createContext()

export const usersReducer = (state, action) => {
    switch (action.type) {
        case 'auth/login':
            return { user: action.payload }
        case 'LOGOUT_USER':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(usersReducer, {
        user: null
    })

    useEffect(() => {
        // automatically log in user if there is a user data in the localStorage
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch({ type: 'auth/login', payload: user })
        }
    }, [])

    console.log('AuthContextProvider state:', state)

    const values = { ...state, dispatch }
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}