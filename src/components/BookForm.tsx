import React, { useState } from 'react'
import { Box, TextField, Button } from '@mui/material'
import { Book } from '../types'

interface BookFormProps {
    addBook: (book: Book) => void
}

const BookForm: React.FC<BookFormProps> = ({ addBook }) => {
    const [title, setTitle] = useState('')
    const [totalPages, setTotalPages] = useState('')
    const [errors, setErrors] = useState<{ title?: string; totalPages?: string }>({})

    const validate = () => {
        const errs: typeof errors = {}
        if (!title.trim()) errs.title = 'El título es obligatorio'
        if (!totalPages.trim()) {
            errs.totalPages = 'El total de páginas es obligatorio'
        } else if (isNaN(Number(totalPages))) {
            errs.totalPages = 'Debe ser un número'
        }
        setErrors(errs)
        return Object.keys(errs).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return

        addBook({
            id: Date.now(),
            title: title.trim(),
            totalPages: Number(totalPages),
            pagesRead: 0,
            status: 'Por leer',
            notes: '',
            rating: 0,
        })

        setTitle('')
        setTotalPages('')
        setErrors({})
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
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
                error={!!errors.title}
                helperText={errors.title}
                sx={{ flex: '1 1 200px' }}
            />
            <TextField
                label="Total de páginas"
                type="number"
                value={totalPages}
                onChange={e => setTotalPages(e.target.value)}
                error={!!errors.totalPages}
                helperText={errors.totalPages}
                sx={{ flex: '1 1 120px' }}
            />
            <Button variant="contained" type="submit" sx={{ height: 48 }}>
                Agregar
            </Button>
        </Box>
    )
}

export default BookForm
