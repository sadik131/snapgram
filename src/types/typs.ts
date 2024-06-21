import React from "react"

export type User = {
    id?: string,
    username: string,
    email: string,
    imageUrl: string,
    bio: string;
}

export type NewUser = {
    email: string;
    username: string;
    password: string;
};

export type ContextType = {
    user: User;
    isLoading: boolean;
    isAuthenticated: boolean;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
};