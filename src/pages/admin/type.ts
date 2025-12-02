export interface IResponse<T> {
    currentPage: number;
    pageSize: number;
    statusCode: number;
    to: number;
    totalElements: number;
    totalPages: number;

    data: T[];
}

export type Teacher = {
    count: number;
    name: string;
    id?: string;
    specification: string;
    isActive: "Active" | "Blocked";
    groups: number;
    username: string;
};

export interface TeacherList {
    createdAt: string;
    avatarUrl: string;
    groups: {
        createdAt: string;
        id: string;
        isActive: boolean;
        isDeleted: boolean;
        lessonTime: string;
        name: string;
        teacherId: string;
        updatedAt: string;
    }[];
    id: string;
    isActive: boolean;
    isDeleted: boolean;
    name: string;
    password: string;
    role: string;
    specifications: {
        id: string;
        category: string;
        name: string;
    };
    updatedAt: string;
    username: string;
}

export interface TeacherField {
    username: string;
    password?: string;
    specification: string[];
    name: string;
}

export interface TeacherDetailT {
    statusCode: number;
    message: {
        uz: string;
        en: string;
        ru: string;
    };
    data: {
        createdAt: string;
        avatarUrl: string;
        groups: {
            createdAt: string;
            id: string;
            isActive: boolean;
            isDeleted: boolean;
            lessonTime: string;
            name: string;
            teacherId: string;
            updatedAt: string;
        }[];
        id: string;
        isActive: boolean;
        isDeleted: boolean;
        name: string;
        password: string;
        role: string;
        specification: string;
        updatedAt: string;
        username: string;
    };
}

export interface SpecificationItem {
    id: number;
    category: string;
    name: string;
}

export interface SpecificationResponse {
    statusCode: number;
    message: { uz: string; en: string; ru: string };
    data: SpecificationItem[];
}

export interface FormProps {
    defaultValueData?: TeacherDetailT;
    closeModal?: () => void;
    teacherId?: string;
}
