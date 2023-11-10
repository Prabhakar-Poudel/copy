export const gitLensOptions = [
	{
		label: '$(gitlens-gitlens) Commit SHA',
		command: 'gitlens.copyShaToClipboard'
	},
	{
		label: '$(gitlens-gitlens) Commit message',
		command: 'gitlens.copyMessageToClipboard'
	},
	{
		label: '$(gitlens-gitlens) Remote commit URL',
		command: 'gitlens.copyRemoteCommitUrl'
	},
	{
		label: '$(gitlens-gitlens) Remote file URL from...',
		command: 'gitlens.copyRemoteFileUrlFrom'
	}
]

export const gitHubOptions = [
	{
		label: '$(mark-github) Permalink',
		command: 'issue.copyGithubPermalink'
	},
	{
		label: '$(mark-github) Permalink as markdown',
		command: 'issue.copyMarkdownGithubPermalink'
	},
	{
		label: '$(mark-github) Head link',
		command: 'issue.copyGithubHeadLink'
	}
]
