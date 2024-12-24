
export interface Game {
    id: string | number;
    userId: string;
    animalId: string | number;
    createdAt?: string;
    user?: {
        id: number;
        fullName: string;
    } | null;
}