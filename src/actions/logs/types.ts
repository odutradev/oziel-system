export interface GetLogsParams {
    limit?: number;
    page?: number;
    action?: string;
    endDate?: string;
    startDate?: string;
}

export interface LogEntry {
    _id?: string;
    ip?: string;
    date?: Date;
    action?: string;
    entity?: string;
    userID?: string;
    entityID?: string;
    timestamp?: Date;
    userAgent?: string;
    description?: string;
    payload?: Record<string, unknown>;
    [key: string]: unknown;
    metadata?: {
        ip?: string;
        location?: string;
        userAgent?: string;
    };
}

export interface LogsResponse {
    data: LogEntry[];
    meta: {
        page: number;
        limit: number;
        pages: number;
        total: number;
    };
}

export interface LogOverview {
    totalLogs: number;
    userUpdates: number;
    userSignups: number;
    userSignins: number;
    userDeletes: number;
    systemActions: number;
}

export interface LogActionStat {
    count: number;
    action: string;
    percentage: string;
}

export interface LogEntityStat {
    count: number;
    entity: string;
    percentage: string;
}

export interface LogUserStat {
    count: number;
    userId: string;
    userName?: string;
    userRole?: string;
    userEmail?: string;
}

export interface LogTimelineEntry {
    date: string;
    count: number;
    userActions: number;
    systemActions: number;
}

export interface LogTopUser extends LogUserStat {
    lastAction: string;
    firstAction: string;
    totalActions: number;
}

export interface LogStatsResponse {
    period: unknown;
    overview: LogOverview;
    byUser: LogUserStat[];
    topUsers: LogTopUser[];
    byAction: LogActionStat[];
    byEntity: LogEntityStat[];
    timeline: LogTimelineEntry[];
}

export interface LogActivityResponse {
    period: {
        hours: number;
        endDate: string;
        startDate: string;
    };
    summary: {
        totalLogs: number;
        uniqueUsers: number;
        uniqueEntities: number;
    };
    recentActivity: LogEntry[];
    byAction: LogActionStat[];
}