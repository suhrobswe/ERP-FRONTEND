export interface IMessage {
    uz: string;
    en: string;
    ru: string;
}

export interface Student {
    studentImg: string | undefined;
    id: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    name: string;
    email: string;
    role: string;
    avatarUrl?: string;
    level: number;
    groupId: string;
    group: {
        id: string;
        isActive: boolean;
        isDeleted: boolean;
        createdAt: string;
        updatedAt: string;
        name: string;
        startTime: string;
        endTime: string;
        durationInMonths: number;
        teacherId: string;
    };
}

export interface Specification {
    id: string;
    category: string;
    name: string;
}

export interface Teacher {
    id: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    name: string;
    username: string;
    role: "TEACHER" | string;
    avatarUrl: string;
    url?: string;
    specifications: Specification[];
}

export interface GroupData {
    id: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    name: string;
    startTime: string;
    endTime: string;
    durationInMonths: number;
    students: Student[];
    teacher: Teacher;
    teacherId: string;
}

export interface GroupsResponse {
    statusCode: number;
    message: IMessage;
    data: GroupData[];
}

export interface GroupSummary {
    id: string;
    name: string;
    studentsCount: number; 
    isActive: boolean;
    count: number;
    startTime: string;
    endTime: string;
    durationInMonths: number;
}
