import {assign, filter, get} from "lodash";
import {Chat, TimelineType} from "@/app/lib/types/timeline.type";

type SortChatField = keyof Chat;

type FilterTimelineOpts = {
    filters?: Partial<Chat>
    sort?: {
        field: SortChatField
        order: 'asc' | 'desc'
    }
}

export const filterTimeline = (timeline: TimelineType, filterOpts?: FilterTimelineOpts): TimelineType => {
    const filteredTimeline = timeline


    const {filters, sort} = get(filterOpts, ['filters', 'sort'], {})

    if (filters) {
        const filteredChats = filter(timeline.chats, filters)
        assign(filteredTimeline, {chats: filteredChats})
    }

    if (sort) {
        const chats = get(filteredTimeline, ['chats'], [])
        const sortedChats = chats.sort((a, b) => {
            const aValue = a[sort.field as keyof Chat];
            const bValue = b[sort.field as keyof Chat];
            // @ts-ignore
            return sort.order === 'asc' ? aValue - bValue : bValue - aValue;
        })

        assign(filteredTimeline, {chats: sortedChats})
    }

    return filteredTimeline
}