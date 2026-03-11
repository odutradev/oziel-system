export interface AuthData {
    password: string;
    email: string;
    name?: string;
}

export interface PasswordResetRequestData {
    email: string;
}

export interface PasswordResetVerifyData {
    email: string;
    code: string;
}

export interface PasswordResetConfirmData {
    email: string;
    code: string;
    newPassword: string;
}

export interface UpdateProfileData {
    name?: string;
    description?: string;
    cpfOrRg?: string;
}

export interface GetAllUsersParams {
    page?: number;
    limit?: number;
    returnType?: "full" | "minimum";
}

export interface UpdateUserByIdData {
    name?: string;
    description?: string;
    status?: "loggedIn" | "registered" | "blocked";
    coins?: number;
    cpfOrRg?: string;
}

export interface PasswordResetResponse {
    success: boolean;
    message: string;
    expiresIn?: number;
    token?: string;
    user?: any;
}

export interface ProfileImageUploadResponse {
    url: string;
    user: any;
    compression: {
        originalSize: number;
        compressedSize: number;
        compressionRatio: string;
        savedBytes: number;
    };
}

export interface DeleteResponse {
    delete: boolean;
}

export interface GetUserMetricsParams {
    startDate?: string;
    endDate?: string;
}

export interface UserMetricsResponse {
    period: {
        startDate: string;
        endDate: string;
    };
    overview: {
        totalUsers: number;
        admins: number;
        normalUsers: number;
        activeRate: string;
        profileCompletionRate: string;
    };
    status: {
        loggedIn: number;
        registered: number;
        blocked: number;
        loggedInPercentage: string;
        registeredPercentage: string;
        blockedPercentage: string;
    };
    profileCompletion: {
        withProfileImage: number;
        withDescription: number;
        withCpfOrRg: number;
        completionRate: string;
    };
    credits: {
        total: number;
        average: number;
        max: number;
        min: number;
        usersWithCredits: number;
        usersWithoutCredits: number;
        distributionRate: string;
        formatted: {
            total: string;
            average: string;
            max: string;
            min: string;
        };
    };
    plans: {
        totalUsersWithPlan: number;
        distribution: Array<{
            planTitle: string;
            users: number;
            totalValue: number;
            avgValue: number;
            totalCredits: number;
            marketShare: string;
            formatted: {
                totalValue: string;
                avgValue: string;
            };
        }>;
    };
    activity: {
        activeLastWeek: number;
        activeLastMonth: number;
        accessedLastWeek: number;
        usersWithFirstSignup: number;
        weeklyActivityRate: string;
        monthlyActivityRate: string;
    };
    engagement: {
        digitalProves: {
            avgPerUser: string;
            maxPerUser: number;
            usersWithDigitalProves: number;
        };
        transactions: {
            avgPerUser: string;
            maxPerUser: number;
            buyingUsers: number;
        };
    };
    conversion: {
        totalUsers: number;
        usersWithPurchases: number;
        conversionRate: string;
        nonBuyingUsers: number;
    };
    retention: Array<{
        period: string;
        totalUsers: number;
        activeUsers: number;
        retentionRate: string;
    }>;
    timeline: Array<{
        date: string;
        count: number;
        admins: number;
        normalUsers: number;
    }>;
    topUsers: {
        byCredits: Array<{
            userId: string;
            name: string;
            email: string;
            credits: number;
            role: string;
            status: string;
            memberSince: Date;
            hasPlan: boolean;
            planTitle?: string;
        }>;
        bySpending: Array<{
            userId: string;
            name: string;
            email: string;
            totalSpent: number;
            transactionCount: number;
            avgTransactionValue: number;
            currentCredits: number;
            role: string;
            status: string;
            formatted: {
                totalSpent: string;
                avgTransactionValue: string;
            };
        }>;
    };
}