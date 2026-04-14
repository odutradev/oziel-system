export type FarmStatusType = "active" | "inactive";

export interface FarmLocation {
    longitude: number;
    latitude: number;
}

export interface FarmModelType {
    totalAreaHectares: number;
    location: FarmLocation;
    status: FarmStatusType;
    createdAt: string;
    name: string;
    id: string;
}