'use client';

import Logo from "@/app/components/logo";
import {ReactElement, useCallback, useContext} from "react";
import {get} from "lodash";
import {Chat} from "@/app/lib/types/timeline.type";
import {ChatContext} from "@/app/lib/chatContext";
import {CurrentUserContext} from "@/app/lib/currentUserContext";
import {createBaseChat, getCurrentTimeline} from "@/app/services/chats";
import {useRouter} from 'next/navigation'

export default function Sidebar(): ReactElement {
    const router = useRouter()
    const {setCurrentChat, setIsTimelineLoading, setTimeline} = useContext(ChatContext);
    const {currentUser} = useContext(CurrentUserContext);

    const sendNewChat = useCallback(async () => {
        setCurrentChat({} as Chat)
        setIsTimelineLoading(false)

        if (currentUser.accessToken) {
            setIsTimelineLoading(true)
            await createBaseChat(currentUser.accessToken)
            const timeline = await getCurrentTimeline(currentUser.accessToken)
            const currentChat = get(timeline, 'chats[0]', {}) as Chat

            setTimeline(timeline)
            setCurrentChat(currentChat)
            setIsTimelineLoading(false)
            router.push('/')
        }
    }, [currentUser.accessToken, router])

    return (
        <div id="application-sidebar"
             className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-slate-900 dark:border-gray-700">
            <nav
                className="hs-accordion-group size-full flex flex-col"
                data-hs-accordion-always-open=""
            >
                <div className="flex items-center justify-center pt-4 pe-4 ps-7">
                    <Logo/>
                </div>
                <div className="h-full">
                    <ul className="space-y-1.5 p-4">
                        <li className={'w-auto flex items-center'}>
                            <button
                                className="flex items-center gap-x-3 py-2 px-3 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                onClick={() => {
                                    sendNewChat()
                                }}>
                                <svg
                                    className="w-auto flex-shrink-0 size-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14"/>
                                    <path d="M12 5v14"/>
                                </svg>
                                New chat
                            </button>
                        </li>
                        <li className={'w-auto flex items-center'}>
                            <button
                                className="flex items-center gap-x-3 py-2 px-3 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                onClick={() => {
                                    router.push(`/chats`)
                                }}>
                                <svg
                                    className="w-auto flex-shrink-0 size-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14"/>
                                    <path d="M12 5v14"/>
                                </svg>
                                History
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}