import { Spinner } from "@/components/ui/spinner";
import { TeacherForm } from "./teacher-form";
import { useTeacherDetail } from "../service/query/useTeacherDetail";

export const TeacherFormWrapper = ({
    id,
    closeEditModal,
}: {
    id: string;
    closeEditModal: () => void;
}) => {
    const { data, isLoading } = useTeacherDetail(id);

    return (
        <div>
            {isLoading ? (
                <Spinner />
            ) : (
                <TeacherForm
                    closeModal={closeEditModal}
                    teacherId={id}
                    defaultValueData={data}
                />
            )}
        </div>
    );
};
