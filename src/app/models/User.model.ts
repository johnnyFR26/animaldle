export interface User {
    id: number
    fullName: string
    phone: string
    password: string
    createdAt: string
    updatedAt: string
    games?:[{
        id: number
        animalId:number
    }]
}