// src/App.tsx
import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import BookForm from './components/BookForm'
import BookList from './components/BookList'
import { Book } from './types'

const App: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        const stored = localStorage.getItem('books')
        if (stored) setBooks(JSON.parse(stored))
    }, [])

    useEffect(() => {
        localStorage.setItem('books', JSON.stringify(books))
    }, [books])

    const addBook = (book: Book) => setBooks(prev => [...prev, book])
    const updateBook = (u: Book) =>
        setBooks(prev => prev.map(b => (b.id === u.id ? u : b)))

    return (
        <Box>
            {/* Header con el título centrado */}
            <Box
                component="header"
                sx={{
                    py: 4,          // espacio arriba y abajo
                    px: 2,          // pequeño padding lateral
                    bgcolor: 'background.paper',
                }}
            >
                <Typography
                    variant="h2"
                    component="h1"
                    align="center"
                >
                    📚 LibroLog
                </Typography>
            </Box>

            {/* Formulario centrado */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    px: 2,
                    mb: 4,
                }}
            >
                <BookForm addBook={addBook} />
            </Box>

            {/* Aquí carga tu BookList, que ya usa CSS Grid full-width */}
            <Box component="main" sx={{ px: 2 }}>
                <BookList books={books} updateBook={updateBook} />
            </Box>
        </Box>
    )
}

export default App
