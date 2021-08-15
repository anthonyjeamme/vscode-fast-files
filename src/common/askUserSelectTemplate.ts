import * as vscode from 'vscode'
import { getTemplatesFolderPath } from './utils'

export const askUserSelectTemplate = async () => {

    const templatesFolderPath = await getTemplatesFolderPath()

    const templatesFolderUri = vscode.Uri.file(templatesFolderPath)

    const folders = (
        await vscode.workspace.fs.readDirectory(templatesFolderUri)
    ).map(([folderName]) => folderName)

    const userChoice = await vscode.window.showQuickPick(folders)

    if (userChoice === undefined) {
        throw new Error(`File generation aborted`)
    }

    return `${templatesFolderPath}/${userChoice}`
}