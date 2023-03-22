import { createContext, useReducer } from "react";

export const UserContext = createContext({})

export const usersReducer = (state, action) => {
    switch (action.type) {
        // creation of a user is handled in useRegisterUser hook
        // case 'users/create':
        //     return { users: [action.payload, ...state.users] }
        case 'users/get':
            return { users: action.payload }
        case 'users/delete':
            return { users: state.users.filter(user => !action.payload.includes(user._id)) }
        case 'users/update':
            return { users: [...state.users, { ...action.payload }] }
        default:
            return state
    }

}

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(usersReducer, {
        users: null
    })

    const values = { ...state, dispatch }

    return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}