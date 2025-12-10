export interface IStudent {
    statusCode: number;
    message: {
        uz: string;
        en: string;
        ru: string;
    };
    data: {
        updatedStudent: {
            id: string;
            isActive: boolean;
            isDeleted: boolean;
            createdAt: string; // yoki Date, agar parse qilinsa
            updatedAt: string; // yoki Date
            name: string;
            email: string;
            role: string;
            avatarUrl: string;
            level: number;
            groupId: string;
            group: {
                id: string;
                isActive: boolean;
                isDeleted: boolean;
                createdAt: string; // yoki Date
                updatedAt: string; // yoki Date
                name: string;
                startTime: string; // "09:00:00" kabi
                endTime: string; // "11:00:00" kabi
                durationInMonths: number;
                teacherId: string;
            };
        };
    };
}
