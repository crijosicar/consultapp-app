'use client';

import Logo from "@/app/components/logo";
import {ReactElement, useCallback, useContext} from "react";
import {get, isEmpty} from "lodash";
import {Chat} from "@/app/lib/types/timeline.type";
import {ChatContext} from "@/app/lib/chatContext";
import {CurrentUserContext} from "@/app/lib/currentUserContext";
import {createBaseChat, getCurrentTimeline} from "@/app/services/chats";
import {useRouter} from 'next/navigation'
import Image from "next/image";
import currentChat from "@/assets/chat.svg";
import addChat from "@/assets/add.svg";
import archiveUp from "@/assets/archive-up.svg";
import faqs from "@/assets/faqs.svg";
import {useCookies} from 'next-client-cookies';
import {useLocalStorage} from "@uidotdev/usehooks";

export default function Sidebar(): ReactElement {
    const cookies = useCookies();
    const router = useRouter()
    const {setCurrentChat, setIsTimelineLoading, setTimeline} = useContext(ChatContext);
    const {currentUser} = useContext(CurrentUserContext);
    const [currentChatLS, setCurrentChatLS] = useLocalStorage("currentChat", "");

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

    const showCurrentChat = useCallback(async () => {
        if (isEmpty(currentChatLS)) {
            setCurrentChat({} as Chat)
            setIsTimelineLoading(false)

            if (currentUser.accessToken) {
                setIsTimelineLoading(true)
                const timeline = await getCurrentTimeline(currentUser.accessToken)
                const currentChat = get(timeline, 'chats[0]', {}) as Chat
                
                setTimeline(timeline)
                setCurrentChat(currentChat)
                setCurrentChatLS(JSON.stringify(currentChat))
                setIsTimelineLoading(false)
            }
        }
        router.push('/')
    }, [currentUser.accessToken, router, currentChatLS])

    const showChats = useCallback(async () => {
        router.push(`/chats`)
    }, [router])

    const showFaqs = useCallback(async () => {
        router.push(`/faqs`)
    }, [router])

    return (
        <div id="application-sidebar"
             className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-slate-900 dark:border-gray-700">
            <nav
                className="hs-accordion-group size-full flex flex-col"
                data-hs-accordion-always-open=""
            >
                <div className="flex items-center justify-center p-4">
                    <Logo/>
                </div>
                <div className="h-full">
                    <ul className="space-y-1.5 p-4">
                        <li className={'w-auto flex items-center'}>
                            <button
                                className="flex items-center gap-x-3 py-2 px-3 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                onClick={() => {
                                    showCurrentChat()
                                }}>
                                <Image
                                    className="w-6 h-6"
                                    src={currentChat}
                                    alt={'Current Chat'}
                                    loading="eager"/>
                                Current chat
                            </button>
                        </li>
                        <li className={'w-auto flex items-center'}>
                            <button
                                className="flex items-center gap-x-3 py-2 px-3 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                onClick={() => {
                                    sendNewChat()
                                }}>
                                <Image
                                    className="w-6 h-6"
                                    src={addChat}
                                    alt={'Add Chat'}
                                    loading="eager"/>
                                New chat
                            </button>
                        </li>
                        <li className={'w-auto flex items-center'}>
                            <button
                                className="flex items-center gap-x-3 py-2 px-3 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                onClick={() => {
                                    showChats()
                                }}>
                                <Image
                                    className="w-6 h-6"
                                    src={archiveUp}
                                    alt={'Archive Chat'}
                                    loading="eager"/>
                                History
                            </button>
                        </li>
                        <li className={'w-auto flex items-center'}>
                            <button
                                className="flex items-center gap-x-3 py-2 px-3 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                onClick={() => {
                                    showFaqs()
                                }}>
                                <Image
                                    className="w-6 h-6"
                                    src={faqs}
                                    alt={'Faqs'}
                                    loading="eager"/>
                                Faqs
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}