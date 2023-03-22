import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const useUsersContext = () => {
    const context = useContext(UserContext)

    if (!context) {
        throw Error("useUserContext must be used inside UserContextProvider.")
    }

    return context
}