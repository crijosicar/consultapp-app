'use client';

import useAuthUser from "@/app/lib/useAuthUser";
import {Chat, TimelineType} from "@/app/lib/types/timeline.type";
import {useContext} from "react";
import {ChatContext} from "@/app/lib/chatContext";
import {assign, filter, get} from "lodash";

type SortChatField = keyof Chat;

type FilterTimelineOpts = {
    filters?: Partial<Chat>
    sort?: {
        field: SortChatField
        order: 'asc' | 'desc'
    }
}

export default function useTimeline(filterOpts?: FilterTimelineOpts): TimelineType | undefined {
    const authUser = useAuthUser()
    const {timeline} = useContext(ChatContext)
    const adaptedTimeline = timeline

    if (!authUser) {
        return undefined
    }

    const {filters, sort} = get(filterOpts, ['filters', 'sort'], {})

    if (filters) {
        const filteredChats = filter(timeline.chats, filters)
        assign(adaptedTimeline, {chats: filteredChats})
    }

    if (sort) {
        const chats = get(adaptedTimeline, ['chats'], [])
        const sortedChats = chats.sort((a, b) => {
            const aValue = a[sort.field as keyof Chat];
            const bValue = b[sort.field as keyof Chat];
            // @ts-ignore
            return sort.order === 'asc' ? aValue - bValue : bValue - aValue;
        })

        assign(adaptedTimeline, {chats: sortedChats})
    }

    return adaptedTimeline
}