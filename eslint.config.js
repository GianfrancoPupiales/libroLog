// eslint.config.js
import path from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig:        js.configs.all
})

export default [
    // 1) Ignora carpetas (reemplaza .eslintignore)
    {
        ignores: [
            'node_modules/**',
            'dist/**',
            'build/**',
            '.git/**'
        ]
    },
    {
        settings: {
            react: { version: 'detect' }
        }
    },

    // 2) Extiende configs clásicas
    ...compat.extends(
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended'
    ),

    // 3) JavaScript / JSX
    {
        files: ['*.js', '*.jsx'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: { jsx: true }
            }
        },
        plugins: {
            react:         reactPlugin,
            'react-hooks': reactHooksPlugin
        },
        rules: {
            // tus reglas JS aquí
        }
    },

    // 4) TypeScript / TSX
    {
        files: ['*.ts', '*.tsx'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            // **Aquí usamos el objeto parser importado**, no un string
            parser: tsParser,
            parserOptions: {
                project: ['./tsconfig.json'],
                tsconfigRootDir: __dirname,
                ecmaFeatures: { jsx: true }
            }
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            react:                reactPlugin,
            'react-hooks':        reactHooksPlugin
        },
        rules: {
            // tus reglas TS específicas aquí
        }
    }
]
