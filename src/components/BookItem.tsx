import React, {useState} from "react";
import {Book} from "../types";

interface BookItemProps {
    book: Book;
    updateBook: (book: Book) => void;
}

const BookItem: React.FC<BookItemProps> = ({book, updateBook}) => {
    const [pagesRead, setPagesRead] = useState(book.pagesRead);
    const [notes, setNotes] = useState(book.notes);
    const [rating, setRating] = useState(book.rating);
    const [status, setStatus] = useState(book.status);

    const handleUpdate = () => {
        updateBook({
            ...book,
            pagesRead,
            notes,
            rating,
            status
        });
    };

    return (
        <div style={{border: "1px solid #ccc", padding: 10, marginBottom: 10}}>
            <h2>{book.title}</h2>
            <p>{pagesRead}/{book.totalPages} páginas leídas</p>

            <input
                type="number"
                min={0}
                max={book.totalPages}
                value={pagesRead}
                onChange={(e) => setPagesRead(parseInt(e.target.value))}
            />

            <div>
                <label>Estado: </label>
                <select value={status} onChange={(e) => setStatus(e.target.value as Book["status"])}>
                    <option value="Por leer">Por leer</option>
                    <option value="Leyendo">Leyendo</option>
                    <option value="Completado">Completado</option>
                </select>
            </div>

            <div>
        <textarea
            placeholder="Notas"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{width: "100%", height: 50}}
        />
            </div>

            <div>
                <label>Calificación: </label>
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        style={{background: star <= rating ? "gold" : "lightgray"}}
                        onClick={() => setRating(star)}
                    >
                        ⭐
                    </button>
                ))}
            </div>

            <button onClick={handleUpdate} style={{marginTop: 10}}>
                Guardar Cambios
            </button>
        </div>
    );
};

export default BookItem;
