// ================================
// Base Interface (Common fields)
// ================================
export interface IBaseEntity {
    id: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

// ================================
// Pagination Generic Response
// ================================
export interface IResponse<T> {
    currentPage: number;
    pageSize: number;
    statusCode: number;
    to: number;
    totalElements: number;
    totalPages: number;
    message: {
        uz: string;
        en: string;
        ru: string;
    };
    data: T[];
}

// ================================
// Student Model
// ================================
export interface IStudent extends IBaseEntity {
    name: string;
    email: string;
    password: string;
    role: string;
    groupId: string;
}

// ================================
// Group Models
// ================================

// Preview type (Teacher ichidagi groups uchun)
export interface IGroupPreview {
    id: string;
    name: string;
    lessonTime: string;
    teacherId: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isDeleted: boolean;
}

export type GroupT = {
    id: string;
    name: string;
    teacher: string;
    specification: string;
    studentCount: number;
    isActive: "Active" | "Blocked";
    index: number;
};

// Full group type (GET /groups response)
export interface IGroup extends IBaseEntity {
    name: string;
    lessonTime: string;
    teacherId: string;
    teacher: ITeacher;
    students?: IStudent[];
}

// ================================
// Teacher Models
// ================================
export interface ITeacher extends IBaseEntity {
    name: string;
    username: string;
    password: string;
    role: string;
    specification: string;
    groups?: IGroupPreview[];
}

// UI Table mapping format
export type Teacher = {
    id?: string;
    name: string;
    username: string;
    specification: string;
    groups: number;
    count: number;
    isActive: "Active" | "Blocked";
};
