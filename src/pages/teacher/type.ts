// Xabar uchun interface
export interface IMessage {
    uz: string;
    en: string;
    ru: string;
}

// Student interface
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

// Specification interface
export interface Specification {
    id: string;
    category: string;
    name: string;
}

// Teacher interface
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

// Har bir guruh ma’lumotlari (API dan keladigan data)
export interface GroupData {
    id: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    name: string;
    startTime: string; // "HH:MM:SS"
    endTime: string; // "HH:MM:SS"
    durationInMonths: number;
    students: Student[];
    teacher: Teacher;
    teacherId: string;
}

// API response
export interface GroupsResponse {
    statusCode: number;
    message: IMessage;
    data: GroupData[];
}

// useMemo uchun summary (students sonini olish oson bo‘lsin)
export interface GroupSummary {
    id: string;
    name: string;
    studentsCount: number; // studentlar soni
    isActive: boolean;
    count: number; // index + 1
    startTime: string; // "HH:MM:SS"
    endTime: string; // "HH:MM:SS"
    durationInMonths: number;
}
