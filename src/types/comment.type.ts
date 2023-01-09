export type CommentType = {
    by: string
    id: number
    kids: Array<number>
    parent: number
    text: string
    time: number
    type: string
}