import React from "react";
import BookItem from "./BookItem";
import {Book} from "../types";

interface BookListProps {
    books: Book[];
    updateBook: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({books, updateBook}) => {
    return (
        <div style={{marginTop: 20}}>
            {books.length === 0 && <p>No hay libros aún 📖</p>}
            {books.map((book) => (
                <BookItem key={book.id} book={book} updateBook={updateBook}/>
            ))}
        </div>
    );
};

export default BookList;
