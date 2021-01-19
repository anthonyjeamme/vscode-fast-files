type TGenerateTSXFileParams = {
  includeSCSS: boolean;
  structure: string;
};

export const generateTSXFile = (
  componentName: string,
  params: TGenerateTSXFileParams
) => `\
import React from 'react'
${params.includeSCSS ? `\nimport './${componentName}.scss'\n` : ""}
const ${componentName} = () => ${
  params.structure === "direct"
    ? `(
	<div className="${componentName}">

	</div>
)`
    : `{

	return (
		<div className="${componentName}">

		</div>
	)
}`
}

export default ${componentName}
`;
