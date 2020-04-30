const format = require('prettier-eslint')

function prettier(text) {
  return format({ text, prettierOptions: { parser: 'babel' } })
}

module.exports = function (plop) {
  plop.setHelper('fileName', (name = '') => name.split('/').pop())
  plop.setHelper('componentName', (name = '') =>
    name.split('/').pop().split('.').shift()
  )
  plop.setHelper('escapeRegex', text =>
    text.replace(/[.*+\-?^${}()|[\]\/\\]/g, '\\$&')
  )

  plop.setGenerator('component', {
    description: 'Generate React component folder',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message:
          'Component name including local path inside `src`,\nex. `modules/auth/components/LoginForm`\n',
      },

      {
        type: 'input',
        name: 'storybookName',
        message: 'StoryBook title,\nex. Modules | Auth/LoginForm\n',
      },
    ],
    actions: [
      {
        type: 'add',
        transform: prettier,
        path: 'src/{{name}}/index.js',
        template: `
          export { default } from './{{fileName name}}'
        `,
      },
      {
        type: 'add',
        transform: prettier,
        path: 'src/{{name}}/{{componentName name}}.jsx',
        template: `
          import React from 'react'
          import styles from './{{componentName name}}.module.scss'

          function {{componentName name}} ({ children }) {
            return <div className={styles.container}>{children}</div>
          }

          export default {{componentName name}}
        `,
      },
      {
        type: 'add',
        transform: prettier,
        path: 'src/{{name}}/{{componentName name}}.stories.jsx',
        template: `
          import React from 'react'
          import {{componentName name}} from './{{componentName name}}'

          export default {
            title: '{{storybookName}}',
          }

          export function story() {
            return <{{componentName name}} />
          }
        `,
      },
      {
        type: 'add',
        transform: prettier,
        path: 'src/{{name}}/{{componentName name}}.test.jsx',
        template: `
          import React from 'react'
          import renderer from 'react-test-renderer'
          import {{componentName name}} from './{{componentName name}}'

          test('{{componentName name}}', () => {
            const component = renderer.create(
                <{{componentName name}} />
            )
            let tree = component.toJSON()
            expect(tree).toMatchSnapshot()
          })
        `,
      },
      {
        type: 'add',
        path: 'src/{{name}}/{{componentName name}}.module.scss',
        template: `:local {
  .container {}
}
        `,
      },
    ],
  })
}
