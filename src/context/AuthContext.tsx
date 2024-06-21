import { getCurrentUser } from '@/lib/appwrite/api';
import { ContextType, User } from '@/types/typs'
import { ReactNode, createContext, useCallback, useState } from 'react'

const INITIAL_USER: User = {
    id: "",
    username: "",
    email: "",
    imageUrl: "",
    bio: ""
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => { },
    setIsAuthenticated: () => { },
    checkAuthUser: async () => false as boolean
};

const AuthContext = createContext<ContextType>(INITIAL_STATE)

function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState(INITIAL_USER)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const checkAuthUser = async () => {
        try {
            const currentAccount = await getCurrentUser()
            if (currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    username: currentAccount.userName,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio,
                })
                setIsAuthenticated(true)
                return true
            }
            return false
        } catch (error) {
            console.log(error)
            return false
        } finally {
            setIsLoading(false)
        }
    }

    const value = {
        user, isLoading, isAuthenticated, setUser, setIsAuthenticated, checkAuthUser
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider