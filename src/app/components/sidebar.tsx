'use client';

import Logo from "@/app/components/logo";
import {ReactElement, useCallback, useContext, useEffect} from "react";
import {v4 as uuidv4} from "uuid";
import {get} from "lodash";
import {Chat} from "@/app/lib/types/timeline.type";
import {ChatContext} from "@/app/lib/chatContext";
import {CurrentUserContext} from "@/app/lib/currentUserContext";

export default function Sidebar(): ReactElement {
    const {setCurrentChat, setIsTimelineLoading, setTimeline} = useContext(ChatContext);
    const {currentUser} = useContext(CurrentUserContext);

    const sendNewChat = useCallback(async () => {
        setCurrentChat({} as Chat)
        setIsTimelineLoading(false)
        
        const getCurrentTimeline = async (accessToken: string) => {
            const fetchOpts = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
            }

            const timelineResponse = await fetch(`${process.env.NEXT_PUBLIC_CORE_API}/api/chat/`, fetchOpts)
            return await timelineResponse.json()
        }

        const createNewChat = async (accessToken: string) => {
            const payload = JSON.stringify({
                timeline: [{
                    id: uuidv4(),
                    user: {
                        id: 1,
                        name: 'ConsultApp',
                        avatar: 'https://ui-avatars.com/api/?name=Consult+App'
                    },
                    title: 'ConsultApp',
                    content: " <h2 className=\"font-medium text-gray-800 dark:text-white\"> How can we help? </h2> <div className=\"space-y-1.5\"> <p className=\"mb-1.5 text-sm text-gray-800 dark:text-white\"> You can ask questions like: </p> <ul className=\"list-disc list-outside space-y-1.5 ps-3.5\"> <li className=\"text-sm text-gray-800 dark:text-white\"> How can I get a VISA as a Colombian national? </li> <li className=\"text-sm text-gray-800 dark:text-white\"> Steps to get a visitor VISA to Canada as a Colombian? </li> <li className=\"text-sm text-gray-800 dark:text-white\"> Is it hard to get a VISA as a Colombian national for Canada? </li> </ul> </div>",
                    timestamp: new Date().toISOString(),
                    type: 'text',
                    status: 'received'
                }]
            })

            const fetchOpts = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: payload
            }

            const timelineResponse = await fetch(`${process.env.NEXT_PUBLIC_CORE_API}/api/chat/`, fetchOpts)
            return await timelineResponse.json()
        }

        if (currentUser.accessToken) {
            setIsTimelineLoading(true)
            await createNewChat(currentUser.accessToken)
            const timeline = await getCurrentTimeline(currentUser.accessToken)
            const currentChat = get(timeline, 'chats[0]', {}) as Chat

            setTimeline(timeline)
            setCurrentChat(currentChat)
            setIsTimelineLoading(false)
        }
    }, [currentUser.accessToken])


    return (
        <div id="application-sidebar"
             className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-slate-900 dark:border-gray-700">
            <nav
                className="hs-accordion-group size-full flex flex-col"
                data-hs-accordion-always-open=""
            >
                <div className="flex items-center justify-between pt-4 pe-4 ps-7">
                    <Logo/>
                </div>
                <div className="h-full">
                    <ul className="space-y-1.5 p-4">
                        <li>
                            <button
                                className="flex items-center gap-x-3 py-2 px-3 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                onClick={() => {
                                    sendNewChat()
                                }}>
                                <svg
                                    className="flex-shrink-0 size-4"
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
                    </ul>
                </div>
            </nav>
        </div>
    )
}