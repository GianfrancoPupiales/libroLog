import { useEffect, useState } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import { Book } from "./types";

function App() {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const storedBooks = localStorage.getItem("books");
        if (storedBooks) {
            setBooks(JSON.parse(storedBooks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("books", JSON.stringify(books));
    }, [books]);

    const addBook = (book: Book) => {
        setBooks(prev => [...prev, book]);
    };

    const updateBook = (updatedBook: Book) => {
        setBooks(prev => prev.map(book => (book.id === updatedBook.id ? updatedBook : book)));
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>📚 Seguimiento de Lectura</h1>
            <BookForm addBook={addBook} />
            <BookList books={books} updateBook={updateBook} />
        </div>
    );
}

export default App;
