import { useMutation } from "@tanstack/react-query";
import { request } from "@/config/request";
import { type LoginResponse, type LoginT } from "../types";

export const useLogin = () => {
    return useMutation({
        mutationFn: async (data: LoginT) => {
            try {
                const res = await request.post<LoginResponse>(
                    "/auth/signin",
                    data,
                    {
                        withCredentials: true,
                    }
                );
                return res.data;
            } catch (err: any) {
                console.error(
                    "Login request failed:",
                    err.response?.data || err.message
                );
                throw err;
            }
        },
    });
};
