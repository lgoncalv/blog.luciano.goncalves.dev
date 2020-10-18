import { Timestamp } from "@google-cloud/firestore";

export interface Post {
    id?: string;
    createdOn?: number | Timestamp | undefined;
    updatedOn?: number | Timestamp | undefined;
    publishedOn?: number | Timestamp | undefined;
    published?: boolean;
    title: string;
    summary: string;
    content?: string;
    slug: string;
}

export interface PostSummary {
    publishedOn: number;
    title: string;
    content: string;
    slug: string;
    readMore: boolean;
}

export interface PostDraftSummary {
    id: string;
    createdOn: number;
    title: string;
}