import { ExtensionContext } from 'vscode'
import { registerCommands } from './register'

export function activate(context: ExtensionContext) {
	let disposables = registerCommands()

	context.subscriptions.push(...disposables)
}

export function deactivate() {}
