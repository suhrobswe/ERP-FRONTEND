export interface IResponse<T> {
    currentPage: number;
    pageSize: number;
    statusCode: number;
    to: number;
    totalElements: number;
    totalPages: number;
    data: T[];
}

export type TeacherStatus = "Active" | "Blocked";

export interface TeacherList {
    id: string;
    name: string;
    username: string;
    password: string;
    role: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    avatarUrl: string;
    groups: GroupInTeacher[];
    specifications: SpecificationItem;
}

export interface GroupInTeacher {
    id: string;
    name: string;
    teacherId: string;
    lessonTime: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface TeacherField {
    username: string;
    password?: string;
    name: string;
    specification: string[];
}

export interface TeacherDetail {
    statusCode: number;
    message: {
        uz: string;
        en: string;
        ru: string;
    };
    data: TeacherDetailData;
}

export interface TeacherDetailData {
    id: string;
    name: string;
    username: string;
    password: string;
    role: string;
    specification: string;
    isActive: boolean;
    isDeleted: boolean;
    avatarUrl: string;
    createdAt: string;
    updatedAt: string;
    groups: GroupInTeacher[];
}

export interface SpecificationItem {
    id: number | string;
    category: string;
    name: string;
}

export interface SpecificationResponse {
    statusCode: number;
    message: {
        uz: string;
        en: string;
        ru: string;
    };
    data: SpecificationItem[];
}

export interface FormProps {
    defaultValueData?: TeacherDetail;
    closeModal?: () => void;
    teacherId?: string;
}

export interface IGroup {
    id: string;
    name: string;
    teacherId: string;
    teacherImg: string;
    startTime: string;
    endTime: string;
    durationInMonths: number;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    teacher: Teacher;
    students: Student[];
}

export interface GroupT {
    id: string;
    index: number;
    name: string;
    teacher: string;
    teacherId: string;
    teacherImg: string;
    studentCount: number;
    isActive: TeacherStatus;
    startTime: string;
    endTime: string;
}

export interface Specification {
    id: string;
    name: string;
}

export interface Teacher {
    isActive: string;
    id: string;
    name: string;
    username: string;
    role: string;
    avatarUrl?: string;
    specification: Specification[];
}

export interface Student {
    id: string;
    name: string;
}

export interface GroupDetailData {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
    durationInMonths: number;
    isActive: boolean;
    students: Student[];
    teacher: Teacher;
    teacherId: string;
}

export interface ApiResponse {
    statusCode: number;
    message: { uz: string; en: string; ru: string };
    data: GroupDetailData;
}

export interface GroupField {
  teacherAvatarUrl: string | undefined;
  teacherName: string | undefined;
  startTime: string;
  endTime: string;
  durationInMonths: number;
  teacherId: string;
}

export type TeacherForUI = {
    id: string;
    name: string;
    username: string;
    groups: number;
    count: number;
    isActive: string;
    specification: string;
};


export type GroupsT = {
    count: number;
    studentCount: number;
    name: string;
    id?: string;
    isActive: "Active" | "Blocked";
    startTime: string;
    endTime: string;
    teacherId?: string;
    durationInMonths: string;
    teacherName: string;
    teacherAvatarUrl: string;
};