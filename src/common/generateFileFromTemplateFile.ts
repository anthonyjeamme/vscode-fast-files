import * as vscode from 'vscode'
import { TextEncoder } from 'util'

export const generateFileFromTemplateFile = async (templateFile: string, targetPath: string, targetFolderName: string) => {

    const templateFileUri = vscode.Uri.file(templateFile)

    const fileContent = Buffer.from(await vscode.workspace.fs.readFile(templateFileUri)).toString('utf8')

    const resultFileContent = fileContent
        .replace(/MyComponent/g, targetFolderName)
        .replace(/my-component/g, camelCaseToDashCase(targetFolderName))
        .replace(/my_component/g, camelCaseToSnakeCase(targetFolderName))

    var textEncoder = new TextEncoder()

    await vscode.workspace.fs.writeFile(
        vscode.Uri.file(targetPath),
        textEncoder.encode(resultFileContent)
    )
}

export const camelCaseToDashCase = (text: string) => text.replace(/([A-Z])/g, '-$1').replace(/^-/, '').toLocaleLowerCase()
export const camelCaseToSnakeCase = (text: string) => text.replace(/([A-Z])/g, '_$1').replace(/^_/, '').toLocaleLowerCase()