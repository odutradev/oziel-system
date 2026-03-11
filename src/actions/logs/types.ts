export interface GetLogsParams {
    page?: number;
    limit?: number;
    action?: string;
    startDate?: string;
    endDate?: string;
}

export interface LogEntry {
    _id?: string;
    action?: string;
    entity?: string;
    entityID?: string;
    userID?: string;
    description?: string;
    payload?: any;
    metadata?: {
        ip?: string;
        userAgent?: string;
        location?: string;
    };
    timestamp?: Date;
    date?: Date;
    ip?: string;
    userAgent?: string;
    [key: string]: any;
}

export interface LogsResponse {
    logs: LogEntry[];
    meta: {
        total: number;
        page: number;
        pages: number;
        limit: number;
    };
}

export interface LogOverview {
    totalLogs: number;
    systemActions: number;
    userSignups: number;
    userSignins: number;
    userUpdates: number;
    userDeletes: number;
}

export interface LogActionStat {
    action: string;
    count: number;
    percentage: string;
}

export interface LogEntityStat {
    entity: string;
    count: number;
    percentage: string;
}

export interface LogUserStat {
    userId: string;
    userName?: string;
    userEmail?: string;
    userRole?: string;
    count: number;
}

export interface LogTimelineEntry {
    date: string;
    count: number;
    systemActions: number;
    userActions: number;
}

export interface LogTopUser extends LogUserStat {
    totalActions: number;
    lastAction: string;
    firstAction: string;
}

export interface LogStatsResponse {
    period: any;
    overview: LogOverview;
    byAction: LogActionStat[];
    byEntity: LogEntityStat[];
    byUser: LogUserStat[];
    timeline: LogTimelineEntry[];
    topUsers: LogTopUser[];
}

export interface LogActivityResponse {
    period: {
        hours: number;
        startDate: string;
        endDate: string;
    };
    summary: {
        totalLogs: number;
        uniqueUsers: number;
        uniqueEntities: number;
    };
    byAction: LogActionStat[];
    recentActivity: LogEntry[];
}