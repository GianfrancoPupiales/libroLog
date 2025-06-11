import React, { useState, useEffect } from 'react'
import {
    Card,
    CardContent,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    Rating,
    Box,
    IconButton,
    Chip,
} from '@mui/material'
import { Edit, Save, Close } from '@mui/icons-material'
import { Book } from '../types'

interface BookItemProps {
    book: Book
    updateBook: (book: Book) => void
}

const BookItem: React.FC<BookItemProps> = ({ book, updateBook }) => {
    const [editing, setEditing] = useState(false)
    const [pagesRead, setPagesRead] = useState(book.pagesRead)
    const [status, setStatus] = useState<Book['status']>(book.status)
    const [rating, setRating] = useState<number | null>(book.rating)

    const [errorPages, setErrorPages] = useState<string>()
    const [errorRating, setErrorRating] = useState<string>()

    useEffect(() => {
        setPagesRead(book.pagesRead)
        setStatus(book.status)
        setRating(book.rating)
        setErrorPages(undefined)
        setErrorRating(undefined)
    }, [book])

    const handleSave = () => {
        if (pagesRead < 0 || pagesRead > book.totalPages) {
            setErrorPages(`Debe estar entre 0 y ${book.totalPages}`)
            return
        }
        if (rating === null || rating === 0) {
            setErrorRating('No olvides calificar con estrellas.')
            return
        }
        updateBook({ ...book, pagesRead, status, rating })
        setEditing(false)
    }

    const handleCancel = () => {
        setPagesRead(book.pagesRead)
        setStatus(book.status)
        setRating(book.rating)
        setEditing(false)
    }

    return (
        <Card
            variant="outlined"
            sx={{
                position: 'relative',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                '&:hover': { boxShadow: 3 },
            }}
        >
            {/* Edit / Save / Cancel buttons */}
            <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                {editing ? (
                    <Stack direction="row" spacing={1}>
                        <IconButton
                            size="small"
                            color="primary"
                            aria-label="guardar"
                            onClick={handleSave}
                        >
                            <Save />
                        </IconButton>
                        <IconButton
                            size="small"
                            aria-label="cancelar"
                            onClick={handleCancel}
                        >
                            <Close />
                        </IconButton>
                    </Stack>
                ) : (
                    <IconButton
                        size="small"
                        aria-label="editar"
                        onClick={() => setEditing(true)}
                    >
                        <Edit />
                    </IconButton>
                )}
            </Box>

            <CardContent sx={{ flexGrow: 1 }}>
                <Stack spacing={2} alignItems="center" sx={{ width: '100%' }}>
                    {/* Title */}
                    <Typography variant="h6" fontWeight="bold" align="center">
                        {book.title}
                    </Typography>

                    {/* Pages read */}
                    {editing ? (
                        <TextField
                            fullWidth
                            label="Páginas leídas"
                            type="number"
                            inputProps={{ min: 0, max: book.totalPages }}
                            value={pagesRead}
                            onChange={e => {
                                setPagesRead(Number(e.target.value))
                                setErrorPages(undefined)
                            }}
                            error={!!errorPages}
                            helperText={errorPages}
                        />
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            {pagesRead} / {book.totalPages} páginas
                        </Typography>
                    )}

                    {/* Status */}
                    {editing ? (
                        <FormControl fullWidth>
                            <InputLabel id={`estado-label-${book.id}`}>Estado</InputLabel>
                            <Select
                                labelId={`estado-label-${book.id}`}
                                label="Estado"
                                value={status}
                                onChange={e => setStatus(e.target.value as Book['status'])}
                            >
                                <MenuItem value="Por leer">Por leer</MenuItem>
                                <MenuItem value="Leyendo">Leyendo</MenuItem>
                                <MenuItem value="Completado">Completado</MenuItem>
                            </Select>
                        </FormControl>
                    ) : (
                        <Chip
                            label={status}
                            size="small"
                            color={
                                status === 'Completado'
                                    ? 'success'
                                    : status === 'Leyendo'
                                        ? 'info'
                                        : 'default'
                            }
                        />
                    )}

                    {/* Rating */}
                    <Box sx={{ width: '100%' }}>
                        <Stack spacing={0.5} alignItems="center">
                            <Rating
                                name={`rating-${book.id}`}
                                value={rating}
                                onChange={(_, val) => {
                                    if (!editing) return
                                    setRating(val)
                                    setErrorRating(undefined)
                                }}
                                readOnly={!editing}
                                size="small"
                            />
                            {editing && errorRating && (
                                <Typography variant="caption" color="error">
                                    {errorRating}
                                </Typography>
                            )}
                        </Stack>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default BookItem
