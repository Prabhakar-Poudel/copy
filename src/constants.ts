export const gitLensOptions = [
	{
		kind: -1,
		label: 'GitLens'
	},
	{
		label: 'Commit SHA',
		command: 'gitlens.copyShaToClipboard'
	},
	{
		label: 'Commit Message',
		command: 'gitlens.copyMessageToClipboard'
	},
	{
		label: 'Remote Commit URL',
		command: 'gitlens.copyRemoteCommitUrl'
	},
	{
		label: 'Remote File URL From...',
		command: 'gitlens.copyRemoteFileUrlFrom'
	}
]

export const gitHubOptions = [
	{
		kind: -1,
		label: 'GitHub Issues'
	},
	{
		label: 'GitHub Permalink',
		command: 'issue.copyGithubPermalink'
	},
	{
		label: 'Github Permalink as Markdown',
		command: 'issue.copyMarkdownGithubPermalink'
	},
	{
		label: 'Github Head Link',
		command: 'issue.copyGithubHeadLink'
	}
]
