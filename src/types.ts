import { QuickPickItem } from 'vscode'

export interface QuickPickOption extends QuickPickItem {
	command?: string
}
