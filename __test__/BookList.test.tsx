import { render, screen } from '@testing-library/react';
import BookList from '../src/components/BookList';
import { Book } from '../src/types';

describe('BookList Component', () => {
    const mockUpdateBook = jest.fn();

    const mockBooks: Book[] = [
        { id: 1, title: 'Book One', totalPages: 100, pagesRead: 10, status: 'Por leer', notes: '', rating: 0 },
        { id: 2, title: 'Book Two', totalPages: 200, pagesRead: 150, status: 'Leyendo', notes: '', rating: 4 },
        { id: 3, title: 'Book Three', totalPages: 300, pagesRead: 300, status: 'Completado', notes: '', rating: 5 },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // --- HU2: Lista no vacía ---
    it('renders a list of book items when books array is not empty', () => {
        // eslint-disable-next-line react/react-in-jsx-scope
        render(<BookList books={mockBooks} updateBook={mockUpdateBook} />);

        // Check if all book titles are present
        expect(screen.getByText('Book One')).toBeInTheDocument();
        expect(screen.getByText('Book Two')).toBeInTheDocument();
        expect(screen.getByText('Book Three')).toBeInTheDocument();

        // Check for specific content within one of the book items
        expect(screen.getByText('10 / 100 páginas')).toBeInTheDocument();
        expect(screen.getByText('Leyendo')).toBeInTheDocument();
        expect(screen.getByLabelText('5 Stars')).toBeInTheDocument(); // For Book Three's rating
    });

    // --- HU2: Lista vacía ---
    it('displays "No hay libros aún 📖" message when books array is empty', () => {
        // eslint-disable-next-line react/react-in-jsx-scope
        render(<BookList books={[]} updateBook={mockUpdateBook} />);

        expect(screen.getByText('No hay libros aún 📖')).toBeInTheDocument();
        // Ensure no book items are rendered
        expect(screen.queryByText('Book One')).not.toBeInTheDocument();
    });
});