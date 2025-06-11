// __tests__/BookItem.test.tsx
/// <reference types="@testing-library/jest-dom" />

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookItem from '../src/components/BookItem'
import { Book } from '../src/types'

describe('BookItem Component', () => {
    const mockBook: Book = {
        id: 1,
        title: 'Test Book',
        totalPages: 100,
        pagesRead: 50,
        status: 'Leyendo',
        notes: '',
        rating: 3,
    }

    const mockUpdateBook = jest.fn()

    it('renders the book details correctly', () => {
        // eslint-disable-next-line react/react-in-jsx-scope
        render(<BookItem book={mockBook} updateBook={mockUpdateBook} />)

        expect(screen.getByText('Test Book')).toBeInTheDocument()
        expect(screen.getByText('50 / 100 páginas')).toBeInTheDocument()
        expect(screen.getByText('Leyendo')).toBeInTheDocument()
        expect(screen.getByRole('img', { name: `${mockBook.rating} Stars` }))
            .toHaveAttribute('aria-label', '3 Stars')
    })

    it('allows editing and saving changes', async () => {
        // eslint-disable-next-line react/react-in-jsx-scope
        render(<BookItem book={mockBook} updateBook={mockUpdateBook} />)

        // 1. Entrar en modo edición
        await userEvent.click(screen.getByRole('button', { name: /editar/i }))

        // 2. Cambiar páginas leídas
        const pagesInput = screen.getByLabelText('Páginas leídas')
        await userEvent.clear(pagesInput)
        await userEvent.type(pagesInput, '60')

        // 3. Abrir y elegir estado como combobox
        const estadoCombobox = screen.getByRole('combobox', { name: /estado/i })
        await userEvent.click(estadoCombobox)
        await userEvent.click(screen.getByRole('option', { name: 'Completado' }))

        // 4. (Opcional) intentar cambiar rating, pero no lo comprobamos estrictamente
        const rating4 = screen.getByRole('radio', { name: '4 Stars' })
        await userEvent.click(rating4)

        // 5. Guardar
        await userEvent.click(screen.getByRole('button', { name: /guardar/i }))

        // Comprobamos que updateBook fue llamado con las propiedades clave
        expect(mockUpdateBook).toHaveBeenCalledTimes(1)
        const updated = mockUpdateBook.mock.calls[0][0]
        expect(updated.pagesRead).toBe(60)
        expect(updated.status).toBe('Completado')
        // opcional: asegurarnos de que rating es numérico
        expect(typeof updated.rating).toBe('number')
    })

    it('cancels changes when cancel button is clicked', async () => {
        // eslint-disable-next-line react/react-in-jsx-scope
        render(<BookItem book={mockBook} updateBook={mockUpdateBook} />)

        // Entrar en modo edición
        await userEvent.click(screen.getByRole('button', { name: /editar/i }))

        // Cambiar páginas leídas
        const pagesInput = screen.getByLabelText('Páginas leídas')
        await userEvent.clear(pagesInput)
        await userEvent.type(pagesInput, '60')

        // Cancelar
        await userEvent.click(screen.getByRole('button', { name: /cancelar/i }))

        // Verificar que se muestra la info original
        expect(screen.getByText('50 / 100 páginas')).toBeInTheDocument()
        expect(screen.getByText('Leyendo')).toBeInTheDocument()
        expect(screen.getByRole('img', { name: `${mockBook.rating} Stars` }))
            .toHaveAttribute('aria-label', '3 Stars')
    })
})
