export type DevNote = {
    title: string, 
    category:string, 
    content: string, 
    author_id: string   
}

export type TPagination = {
    totalPages: number
    pageNumber: number,
    pageSize: number
}