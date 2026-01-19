import json from '@eslint/json'
import importPlugin from 'eslint-plugin-import'
import markdown from '@eslint/markdown'
import yml from 'eslint-plugin-yml'

export default [
    { ignores: ['**/package-lock.json'] },
    {
        files: ['**/*.{js,mjs}'],
        plugins: { 'import': importPlugin },
        rules: {
            ...importPlugin.flatConfigs.recommended.rules,
            'import/no-named-as-default-member': 'off', // allow accessing named exports via default import
            'import/no-unresolved': ['error', { ignore: ['^(?:https?://)'] }] // allow dynamic imports from URLs...
                // ...maintainer refuses to support (https://github.com/import-js/eslint-plugin-import/issues/3118)
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
    },
    { files: ['**/*.{yaml,yml}'], ...yml.configs['flat/standard'][1] }
]
