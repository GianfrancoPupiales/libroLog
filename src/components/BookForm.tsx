// src/components/BookForm.tsx
import React, { useState } from 'react'
import { Box, TextField, Button } from '@mui/material'
import { Book } from '../types'

interface BookFormProps {
    addBook: (book: Book) => void
}

const BookForm: React.FC<BookFormProps> = ({ addBook }) => {
    const [title, setTitle] = useState('')
    const [totalPages, setTotalPages] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!title || !totalPages) return

        addBook({
            id: Date.now(),
            title,
            totalPages: Number(totalPages),
            pagesRead: 0,
            status: 'Por leer',
            notes: '',
            rating: 0,
        })

        setTitle('')
        setTotalPages('')
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                alignItems: 'center',
                mb: 4,
                width: '100%',
                maxWidth: 1000,
                mx: 'auto',
                px: 2,
            }}
        >
            <TextField
                label="Título del libro"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                sx={{ flex: '1 1 200px' }}
            />
            <TextField
                label="Total de páginas"
                type="number"
                value={totalPages}
                onChange={e => setTotalPages(e.target.value)}
                required
                sx={{ flex: '1 1 120px' }}
            />
            <Button variant="contained" type="submit" sx={{ height: 48 }}>
                Agregar
            </Button>
        </Box>
    )
}

export default BookForm
