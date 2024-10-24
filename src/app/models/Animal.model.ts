export interface Animal {
    id: number,
    name: string,
    characteristics: {
      Habitat: string,
      Filo: string,
      "Estado de conservação": string,
      Dieta: string,
      "Método de reprodução": string,
      Classe: string
    },
    createdAt: string,
    updatedAt: string
}