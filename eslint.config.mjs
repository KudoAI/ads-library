
import globals from 'globals'
import json from '@eslint/json'
import importPlugin from 'eslint-plugin-import-x'
import markdown from '@eslint/markdown'

export default [
    { ignores: ['**/package-lock.json'] },
    {
        files: ['**/*.{js,mjs}'],
        plugins: { 'import-x': importPlugin },
        rules: {
            ...importPlugin.flatConfigs.recommended.rules,
            'import-x/no-named-as-default-member': 'off', // allow accessing named exports via default import
            'import-x/no-unresolved': ['error', { ignore: ['^(?:https?://)'] }] // allow dynamic imports from URLs
        }
    },
    { files: ['**/*.json'], language: 'json/json', ...json.configs.recommended },
    {
        files: ['**/*.md'], language: 'markdown/commonmark', plugins: { markdown },
        rules: {
            ...markdown.configs.recommended[0].rules,
            'markdown/heading-increment': 'off', // allow headings to skip levels
            'markdown/fenced-code-language': 'off', // allow code blocks w/ no language specified
            'markdown/no-missing-label-refs': 'off', // allow missing label references
            'markdown/no-multiple-h1': 'off', // allow multi H1s
            'markdown/require-alt-text': 'off' // allow missing img alts
        }
    }
]
