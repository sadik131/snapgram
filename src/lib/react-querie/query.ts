import { useMutation, useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUser, signInUser } from '../appwrite/api';
import { NewUser } from '@/types/typs';

export const useCreateUserMutation = () => {
    return useMutation({
        mutationFn: (user: NewUser) => createUser(user)
    });
};

export const useSignInMutation = () => {
    return useMutation({
        mutationFn: (user: { email: string, password: string }) => signInUser(user)
    });
};