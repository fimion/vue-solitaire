import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'


const requireComponent = require.context(
    // Look for files in the current directory
    '.',
    // Do not look in subdirectories
    false,
    /[\w-]+\.vue$/,
)

const globalComponents = []

// For each matching file name...
requireComponent.keys().forEach((fileName) => {
  // Get the component config
  const componentConfig = requireComponent(fileName)
  // Get the PascalCase version of the component name
  const componentName = upperFirst(
      camelCase(
          fileName
          // Remove the "./_" from the beginning
              .replace(/^\.\/_/, '')
              // Remove the file extension from the end
              .replace(/\.\w+$/, ''),
      ),
  )
  // Globally register the component
  globalComponents.push({name:componentName, component: (componentConfig.default || componentConfig)})
})

export default function addGlobalComponents(app){
  globalComponents.forEach(({name, component})=>{
    app.component(name, component)
  })
}
