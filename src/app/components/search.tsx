'use client';

import {ReactElement, useContext} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {CurrentUserContext} from "@/app/lib/currentUserContext";
import {ChatContext} from "@/app/lib/chatContext";
import useAuthUser from "@/app/lib/useAuthUser";
import {v4 as uuidv4} from 'uuid';
import {get} from "lodash";
import {Timeline} from "@/app/lib/types/timeline.type";
import {updateChatTimeline} from "@/app/services/chats";

type SearchInput = {
    question: string
}

export default function Search(): ReactElement {
    const {currentUser} = useContext(CurrentUserContext);
    const {
        currentChat,
        setCurrentChat,
        setIsTimelineLoading,
        setSearchSent
    } = useContext(ChatContext);
    const authUserData = useAuthUser();
    const {
        register,
        handleSubmit,
        formState: {isSubmitting},
        reset,
    } = useForm<SearchInput>()

    const onSubmit: SubmitHandler<SearchInput> = async (data) => {
        if (!currentUser.accessToken) return

        const mixedTimeline = [
            ...get(currentChat, 'timeline', []),
            {
                id: uuidv4(),
                user: {
                    id: authUserData?.id,
                    name: 'Guest User',
                    avatar: 'https://ui-avatars.com/api/?name=Guest+User'
                },
                title: 'Guest User',
                content: data.question,
                timestamp: new Date().toISOString(),
                type: 'text',
                status: 'sent'
            }
        ] as Timeline

        setSearchSent(true)
        setIsTimelineLoading(true)

        const postedNewTL = await updateChatTimeline(currentUser.accessToken, currentChat.id, mixedTimeline)

        setCurrentChat(postedNewTL)
        setIsTimelineLoading(false)
        reset()
    }

    return (
        <div className="max-w-4xl mx-auto sticky bottom-0 z-10 p-3 sm:py-6">
            <div className="lg:hidden flex justify-end mb-2 sm:mb-3">
                <button
                    type="button"
                    className="p-2 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    data-hs-overlay="#application-sidebar"
                    aria-controls="application-sidebar"
                    aria-label="Toggle navigation"
                >
                    <svg
                        className="flex-shrink-0 size-3.5"
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
                        <line x1={3} x2={21} y1={6} y2={6}/>
                        <line x1={3} x2={21} y1={12} y2={12}/>
                        <line x1={3} x2={21} y1={18} y2={18}/>
                    </svg>
                    <span>Menu</span>
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="relative">
                    <textarea
                        {...register("question", {required: "This field is required", minLength: 3})}
                        className={'p-4 pb-12 block w-full bg-gray-100 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600'}
                        placeholder="Ask me anything..."
                        defaultValue={""}
                    />
                    <div className="absolute bottom-px inset-x-px p-2 rounded-b-md bg-gray-100 dark:bg-slate-800">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center"></div>
                            <div className="flex items-center gap-x-1">
                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                >
                                    <svg
                                        className="flex-shrink-0 size-3.5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}