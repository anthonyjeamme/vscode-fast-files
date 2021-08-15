import * as vscode from 'vscode'
import { askUserSelectTemplate } from '../common/askUserSelectTemplate'
import { generateFilesFromTemplate } from '../common/generateFromTemplate'
import { getTargetFolderName } from '../common/utils'

export const generateFromTemplate = () =>
	vscode.commands.registerCommand(
		'fast-files.custom-generate',
		async (props) => {

			try {
				const targetFolderPath = props.fsPath
				const targetFolderName = getTargetFolderName(props)
				const templateFolderPath = await askUserSelectTemplate()

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
