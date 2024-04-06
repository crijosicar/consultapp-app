'use client';

import {Chat} from "@/app/lib/types/timeline.type";
import {BubbleType} from "@/app/lib/types/bubble.type";
import {useRouter} from 'next/navigation'
import {useContext} from "react";
import {ChatContext} from "@/app/lib/chatContext";

type ChatRowProps = {
    chat: Chat;
}

export default function ChatRow({chat}: ChatRowProps) {
    const {setCurrentChat} = useContext(ChatContext);
    const router = useRouter();
    const lastChatInfo = (chat.timeline ? chat.timeline[chat.timeline.length - 1] : {}) as BubbleType;

    const parseLastContent = (lastChat: BubbleType, chat: Chat): string => {
        if (lastChat.user.name === "ConsultApp") {
            return lastChat.content.replace(/<[^>]*>?/gm, '');
        }

        return lastChat.content
    }

    return (
        <tr className={'hover:bg-gray-100 dark:hover:bg-gray-700'}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                {chat.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                <p className="text-pretty break-all max-h-40 overflow-auto max-w-auto">
                    {lastChatInfo ? parseLastContent(lastChatInfo, chat) : 'No messages'}
                </p>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                }).format(new Date(chat.created_at))}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium space-x-2">
                <button type="button"
                        onClick={() => {
                            setCurrentChat(chat)
                            router.push('/')
                        }}
                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400">See
                </button>
            </td>
        </tr>
    )
}