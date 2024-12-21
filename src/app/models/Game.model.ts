export interface Game {
    id: string;
    userId: string;
    animalId: string;
    createdAt: string;
    user: {
        id: number;
        fullName: string;
    } | null;
}