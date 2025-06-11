// Importa los matchers adicionales de React Testing Library
import '@testing-library/jest-dom'

// Mock global para el objeto `window` o cualquier otra configuración necesaria
// Ejemplo: Mock para scrollTo
Object.defineProperty(window, 'scrollTo', { value: jest.fn(), writable: true })

// Configuración adicional si usas otras librerías o necesitas mocks globales
// Por ejemplo, si usas fetch:
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
    })
) as jest.Mock