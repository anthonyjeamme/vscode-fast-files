import * as vscode from 'vscode'

export const getTargetFolderName = (props: any) => {
    return vscode.workspace
        .asRelativePath(props)
        .split('/')
        .slice(-1)[0]
}

export const getTemplatesFolderPath = async () => {

    if (!vscode.workspace.workspaceFolders) {
        throw new Error(`Error getting extension template folder`)
    }

    const rootPath = vscode.workspace.workspaceFolders[0].uri.path

    return `${rootPath}/.vscode/generate-react-components/templates`
}

export const getDefaultTemplateFolderPath = async () => {
    const templatesFolderPath = await getTemplatesFolderPath()

    const defaultTemplate =
        vscode.workspace
            .getConfiguration("generate-react-components")
            .get('default-template')

    if (!defaultTemplate) {
        return null
    }

    return `${templatesFolderPath}/${defaultTemplate}`
}