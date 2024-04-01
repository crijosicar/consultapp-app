'use client';

import {Dispatch, ReactElement, SetStateAction, useCallback, useEffect, useState} from "react";
import Sidebar from "@/app/components/sidebar";
import Search from "@/app/components/search";
import Timeline from "@/app/components/timeline";
import {ChatContext} from "@/app/lib/chatContext";
import {CurrentUser, CurrentUserContext} from "@/app/lib/currentUserContext";
import {Chat, TimelineType} from "@/app/lib/types/timeline.type";
import {v4 as uuidv4} from 'uuid';
import {useCookies} from "react-cookie";
import {get, isEmpty} from "lodash";


export default function Home(): ReactElement {
    const [cookies, setCookie] = useCookies(['uid']);
    const [currentUser, setCurrentUser] = useState<CurrentUser>({});
    const [currentChat, setCurrentChat] = useState<Chat>({} as Chat);
    const [timeline, setTimeline] = useState({} as TimelineType);
    const [isTimelineLoading, setIsTimelineLoading] = useState(false);
    const [searchSent, setSearchSent] = useState(false);

    const loginUser = useCallback(async () => {
        const payload = JSON.stringify({email: cookies.uid})

        const sendLoginUser = async (): Promise<any> => {
            const response = await fetch('/api/login', {method: 'POST', body: payload})
            return await response.json()
        }

        const sendSignupUser = async (): Promise<any> => {
            await fetch('/api/signup', {
                method: 'POST',
                body: payload
            })
        }

        let loginUserResponse = await sendLoginUser()

        if (loginUserResponse.error === "Invalid credentials") {
            await sendSignupUser()
            await new Promise(resolve => setTimeout(resolve, 1000))
            loginUserResponse = await sendLoginUser()
        }

        const {accessToken, refreshToken} = loginUserResponse

        if (accessToken) {
            setCurrentUser({
                accessToken,
                refreshToken
            })
        }
    }, [cookies.uid])

    const fetchTimeline = useCallback(async () => {
        const {accessToken} = currentUser

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

        if (accessToken) {
            let timeline = await getCurrentTimeline(accessToken)
            setIsTimelineLoading(true)
            let currentChat = get(timeline, 'chats[0]', {}) as Chat

            if (isEmpty(currentChat)) {
                await createNewChat(accessToken)
                timeline = await getCurrentTimeline(accessToken)
                currentChat = get(timeline, 'chats[0]', {}) as Chat
            }

            setTimeline(timeline)
            setCurrentChat(currentChat)
            setIsTimelineLoading(false)
        }
    }, [currentUser.accessToken])

    useEffect(() => {
        if (!cookies.uid) {
            const newUID = `${uuidv4()}@consultapp.com`
            setCookie('uid', newUID, {path: '/', maxAge: 60 * 60 * 24 * 7})
        }
        loginUser().then(() => {
            fetchTimeline()
        })
    }, [loginUser, fetchTimeline, cookies.uid, setCookie]);

    return (
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
            <ChatContext.Provider
                value={{
                    timeline,
                    setTimeline,
                    currentChat,
                    setCurrentChat,
                    isTimelineLoading,
                    setIsTimelineLoading,
                    searchSent,
                    setSearchSent
                }}>
                <Sidebar/>
                <div className="relative h-screen w-full lg:ps-64">
                    <div className="py-10 lg:py-14">
                        <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto text-center">
                            <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
                                Welcome to ConsultApp
                            </h1>
                            <p className="mt-3 text-gray-600 dark:text-gray-400">
                                Your AI-powered consultant for all your migration-related queries
                            </p>
                        </div>
                        <Timeline/>
                    </div>
                    <Search/>
                </div>
            </ChatContext.Provider>
        </CurrentUserContext.Provider>);
}
