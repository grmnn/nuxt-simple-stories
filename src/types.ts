export interface IStory {
	name: string
	path: string
}

export interface ITreeItem {
	name: string
	children?: ITreeItem[]
	component?: string
}
