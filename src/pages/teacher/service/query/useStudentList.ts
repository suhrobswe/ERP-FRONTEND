import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";

export const useStudentList = () => {
    return useQuery({
        queryKey: ["studentList"],
        queryFn: () => request.get("/student/top-student"),
    });
};
