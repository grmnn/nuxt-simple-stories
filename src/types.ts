export interface IStory {
	name: string
	component: string
}

export interface ITreeItem {
	name: string
	children?: ITreeItem[]
	component?: string
}
