export interface IStory {
	name: string
	path: string
	component: any
	variants: any[]
}

export interface ITreeItem {
	name: string
	children?: ITreeItem[]
	component?: string
	variants: any[]
}
