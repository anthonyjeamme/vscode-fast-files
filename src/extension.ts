// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import { generateFromTemplate } from './customGenerate/customGenerate'
import { quickGenerate } from './quickGenerate/quickGenerate'

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(quickGenerate())
	context.subscriptions.push(generateFromTemplate())
}

export function deactivate() { }
