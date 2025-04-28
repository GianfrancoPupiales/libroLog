import React, {useState} from "react";
import {Book} from "../types";

interface BookFormProps {
    addBook: (book: Book) => void;
}

const BookForm: React.FC<BookFormProps> = ({addBook}) => {
    const [title, setTitle] = useState("");
    const [totalPages, setTotalPages] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !totalPages) return;

        const newBook: Book = {
            id: Date.now(),
            title,
            totalPages: parseInt(totalPages),
            pagesRead: 0,
            status: "Por leer",
            notes: "",
            rating: 0
        };

        addBook(newBook);
        setTitle("");
        setTotalPages("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Título del libro"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="number"
                placeholder="Total de páginas"
                value={totalPages}
                onChange={(e) => setTotalPages(e.target.value)}
            />
            <button type="submit">Agregar Libro</button>
        </form>
    );
};

export default BookForm;
