import json from '@eslint/json'
import markdown from '@eslint/markdown'
import eslintPluginYml from 'eslint-plugin-yml'

export default [
    { files: ['**/*.json'], ignores: ['**/package-lock.json'], language: 'json/json', ...json.configs.recommended },
    {
        files: ['**/*.md'], language: 'markdown/commonmark', plugins: { markdown },
        rules: {
            ...markdown.configs.recommended[0].rules,
            'markdown/heading-increment': 'off', // allow headings to skip levels
            'markdown/fenced-code-language': 'off', // allow code blocks w/ no language specified
            'markdown/no-missing-label-refs': 'off' // allow missing label references
        }
    },
    { files: ['**/*.yaml, **/*.yml'], ...eslintPluginYml.configs['flat/standard'][1] }
]
