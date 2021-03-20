import { TextEncoder } from 'util'
import * as vscode from 'vscode'
import { generateSCSSFile } from '../common/generateSCSSFile'
import { generateTSXFile } from '../common/generateTSXFile'

export const quickGenerate = () =>
	vscode.commands.registerCommand(
		'react-component-generator.quick-generate',
		async (props) => {
			var enc = new TextEncoder()

			const componentName = vscode.workspace
				.asRelativePath(props)
				.split('/')
				.slice(-1)[0]

			let folder = props.fsPath

			const tsxFile = vscode.Uri.file(`${folder}/${componentName}.tsx`)
			const scssFile = vscode.Uri.file(`${folder}/${componentName}.scss`)

			await vscode.workspace.fs.writeFile(
				tsxFile,
				enc.encode(
					generateTSXFile(componentName, {
						includeSCSS: true,
						structure: 'with return',
						includeTypescript: false
					})
				)
			)

			await vscode.workspace.fs.writeFile(
				scssFile,
				enc.encode(generateSCSSFile(componentName))
			)

			const doc = await vscode.workspace.openTextDocument(tsxFile)

			vscode.window.showTextDocument(doc)

			vscode.window.showInformationMessage(
				`Component ${componentName} created.`
			)
		}
	)
