import { request } from "@/config/request";
import { useMutation } from "@tanstack/react-query";

export const useUploadImage = (id: string) => {
    return useMutation({
        mutationFn: (data: FormData) =>
            request
                .patch(`/teacher/update-avatar-teacher/${id}`, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => res.data),
    });
};
