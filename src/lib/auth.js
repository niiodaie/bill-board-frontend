import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "./queryClient";
export function useAuth() {
    return useQuery({
        queryKey: ["/api/user"],
        retry: false,
        staleTime: Infinity,
    });
}
export function useLogin() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (credentials) => {
            const res = await apiRequest("POST", "/api/login", credentials);
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/user"] });
        },
    });
}
export function useRegister() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (userData) => {
            const res = await apiRequest("POST", "/api/register", userData);
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/user"] });
        },
    });
}
export function useLogout() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const res = await apiRequest("POST", "/api/logout");
            return res.json();
        },
        onSuccess: () => {
            queryClient.setQueryData(["/api/user"], null);
        },
    });
}
