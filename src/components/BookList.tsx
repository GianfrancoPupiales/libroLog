// src/components/BookList.tsx
import React from 'react'
import { Box, Typography } from '@mui/material'
import BookItem from './BookItem'
import { Book } from '../types'

interface BookListProps {
    books: Book[]
    updateBook: (book: Book) => void
}

const BookList: React.FC<BookListProps> = ({ books, updateBook }) => {
    if (books.length === 0) {
        return  <Typography align="center" sx={{ mt: 4 }}>
            No hay libros aún 📖
        </Typography>
    }

    return (
        <Box
            component="section"
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: 2,
                mt: 4,
            }}
        >
            {books.map((b) => (
                <BookItem key={b.id} book={b} updateBook={updateBook} />
            ))}
        </Box>
    )
}

export default BookList
