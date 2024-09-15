import { createContext, useEffect, useState } from "react"
import { SaveUserLocalUseCase } from "../../Domain/useCases/userLocal/SaveUserLocal"
import { GetUserLocalUseCase } from "../../Domain/useCases/userLocal/GetUserLocal"
import { RemoveUserLocalUseCase } from "../../Domain/useCases/userLocal/RemoveUserLocal"
import { User } from "../../Domain/entities/User"

export const userInitialState: User = {
    id: '',
    name: '',
    lastname: '',
    email: '',
    phone: '',
    image: '',
    password: '',
    confirmPassword: '',
    session_token: '',
    roles: []
}

export type UserContextProps = {
    user: User
    saveUserSession: (user: User) => Promise<void>
    getUserSession: () => Promise<void>
    removeUserSession: () => Promise<void>
}

export type UserProviderProps = {
    children: React.ReactNode
}

export const UserContext = createContext<UserContextProps>(null!)

export const UserProvider = ({children}: UserProviderProps) => {

    const [user, setUser] = useState(userInitialState)

    useEffect(() => {
        getUserSession()
    }, [])

    const saveUserSession = async (user: User) => {
        await SaveUserLocalUseCase(user)
        setUser(user)
    }

    const getUserSession = async () => {
        const user = await GetUserLocalUseCase()
        setUser(user)
    }

    const removeUserSession = async () => {
        await RemoveUserLocalUseCase()
        setUser(userInitialState)
    }

    return (
        <UserContext.Provider
            value={{
                user,
                saveUserSession,
                getUserSession,
                removeUserSession
            }}
        >
            {children}
        </UserContext.Provider>
    )
}