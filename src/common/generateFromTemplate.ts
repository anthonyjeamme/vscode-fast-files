import * as vscode from 'vscode'
import { generateFileFromTemplateFile } from './generateFileFromTemplateFile'

export const generateFilesFromTemplate = async (
    templateFolderPath: string,
    targetFolderPath: string,
    targetName: string
) => {
    const templateFolderUri = vscode.Uri.file(templateFolderPath)

    const templateFiles = (
        await vscode.workspace.fs.readDirectory(templateFolderUri)
    ).map(([fileName, type]) => ({ fileName, type }))


    for (const templateFile of templateFiles) {

        if (templateFile.type === 1) {

            await generateFileFromTemplateFile(
                `${templateFolderPath}/${templateFile.fileName}`,
                `${targetFolderPath}/${templateFile.fileName.replace('MyComponent', targetName)}`,
                targetName
            )
        }
    }
}