import {BubbleType} from "@/app/lib/types/bubble.type";

export type TimelineType = {
    chats: Chat[]
    count: number
}

export type Timeline = BubbleType[];

export type Chat = {
    id: number
    account_id: number
    timeline?: Timeline
    created_at: string
    updated_at: string
}