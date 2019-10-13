export interface PostEdit {
    id?: string;
    published: boolean;
    publishedOn?: number;
    createdOn?: number;
    updatedOn?: number;
    title: string;
    summary: string;
    content?: string;
}

export interface PostView {
    id: string;
    publishedOn: number;
    title: string;
    content: string;
    slug: string;
}

export interface PostSaved {
    slug: string;
    published: boolean;
}

export interface PostSummary {
    publishedOn: number;
    title: string;
    content: string;
    slug: string;
}

export interface PostDraftSummary {
    id: string;
    createdOn: number;
    title: string;
}

