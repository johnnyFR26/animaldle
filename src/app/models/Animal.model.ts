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
    status: {
      name: string,
      habitat: string,
      filo: string,
      conservacao: string,
      dieta: string,
      reproducao: string,
      classe: string
    }
    createdAt: string,
    updatedAt: string
}