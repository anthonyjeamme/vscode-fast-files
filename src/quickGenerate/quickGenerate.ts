import * as vscode from 'vscode'
import { generateFilesFromTemplate } from '../common/generateFromTemplate'
import { getDefaultTemplateFolderPath, getTargetFolderName } from '../common/utils'

export const quickGenerate = () =>
	vscode.commands.registerCommand(
		'fast-files.quick-generate',
		async (props) => {

			try {
				const targetFolderPath = props.fsPath
				const targetFolderName = getTargetFolderName(props)
				const templateFolderPath = await getDefaultTemplateFolderPath()


				if (!templateFolderPath) {
					throw new Error(
						`No default template set yet. Please edit your settings.json file and add 
						"generate-react-components": { "default-template": "nameofyourtemplatefolder" }`
					)
				}

				await generateFilesFromTemplate(
					templateFolderPath,
					targetFolderPath,
					targetFolderName
				)


			} catch (error) {
				vscode.window.showErrorMessage(
					error.message
				)
			}

		}
	)
