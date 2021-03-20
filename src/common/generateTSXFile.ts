type TGenerateTSXFileParams = {
	includeSCSS: boolean
	structure: string
	includeTypescript: boolean
}

export const generateTSXFile = (
	componentName: string,
	params: TGenerateTSXFileParams
) => `\
import React from "react"

${
	params.includeTypescript
		? `import { T${componentName}Props } from "./${componentName}.types"\n\n`
		: ''
}\
${params.includeSCSS ? `import "./${componentName}.scss"\n\n` : ''}\
const ${componentName}: T${componentName} = () => ${
	params.structure === 'direct'
		? `(
	<div className="${componentName}">
		${componentName}
	</div>
)`
		: `{

	return <div className="${componentName}">${componentName}</div>
}`
}

export default ${componentName}

type T${componentName} = React.FC
`
