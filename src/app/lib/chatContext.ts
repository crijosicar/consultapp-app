'use client';

import {createContext, Dispatch, SetStateAction} from "react";
import {Chat, TimelineType} from "@/app/lib/types/timeline.type";

type ChatContextType = {
    timeline: TimelineType;
    setTimeline: Dispatch<SetStateAction<TimelineType>>;
    searchSent: boolean;
    setSearchSent: Dispatch<SetStateAction<boolean>>;
    isTimelineLoading: boolean;
    setIsTimelineLoading: Dispatch<SetStateAction<boolean>>;
    currentChat: Chat;
    setCurrentChat: Dispatch<SetStateAction<Chat>>;
}

export const ChatContext = createContext<ChatContextType>({} as ChatContextType);