export interface Book {
    id: number;
    title: string;
    totalPages: number;
    pagesRead: number;
    status: "Por leer" | "Leyendo" | "Completado";
    notes: string;
    rating: number;
}
