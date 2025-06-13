import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookForm from '../src/components/BookForm';

describe('BookForm Component', () => {
    const mockAddBook = jest.fn();

    beforeEach(() => {
        mockAddBook.mockClear();
    });

    it('renders the form fields and button', () => {
        // eslint-disable-next-line react/react-in-jsx-scope
        render(<BookForm addBook={mockAddBook} />);

        expect(screen.getByLabelText('Título del libro')).toBeInTheDocument();
        expect(screen.getByLabelText('Total de páginas')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /agregar/i })).toBeInTheDocument();
    });



    // --- HU1: Sin título ---
    it('shows validation error when title is empty', async () => {
        // eslint-disable-next-line react/react-in-jsx-scope
        render(<BookForm addBook={mockAddBook} />);

        const totalPagesInput = screen.getByLabelText('Total de páginas');
        const addButton = screen.getByRole('button', { name: /agregar/i });

        await userEvent.type(totalPagesInput, '200');
        await userEvent.click(addButton);

        // Expect validation message for title
        await waitFor(() => {
            expect(screen.getByText('El título es obligatorio')).toBeInTheDocument();
        });
        // Ensure addBook was not called
        expect(mockAddBook).not.toHaveBeenCalled();
        // Ensure other field retains its value by checking its displayed value
        await waitFor(() => {
            // Use toHaveDisplayValue for inputs to check what the user visually sees
            expect(totalPagesInput).toHaveDisplayValue('200');
        });
    });

    // --- HU1: Sin total de páginas ---
    it('shows validation error when totalPages is empty', async () => {
        // eslint-disable-next-line react/react-in-jsx-scope
        render(<BookForm addBook={mockAddBook} />);

        const titleInput = screen.getByLabelText('Título del libro');
        const addButton = screen.getByRole('button', { name: /agregar/i });

        await userEvent.type(titleInput, 'El Principito');
        await userEvent.click(addButton);

        // Expect validation message for total pages
        await waitFor(() => {
            expect(screen.getByText('El total de páginas es obligatorio')).toBeInTheDocument();
        });
        // Ensure addBook was not called
        expect(mockAddBook).not.toHaveBeenCalled();
        // Ensure other field retains its value
        await waitFor(() => {
            expect(titleInput).toHaveValue('El Principito');
        });
    });
});