'use client';

import {useCallback, useEffect, useState} from "react";
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";
import Sidebar from "@/app/components/sidebar";
import {useCookies} from "react-cookie";
import {CurrentUser, CurrentUserContext} from "@/app/lib/currentUserContext";
import {Chat, TimelineType} from "@/app/lib/types/timeline.type";
import {createBaseChat, getCurrentTimeline} from "@/app/services/chats";
import {filterTimeline} from "@/app/lib/chats.util";
import {get, isEmpty} from "lodash";
import {sendLoginUser, sendSignupUser} from "@/app/services/auth";
import {v4 as uuidv4} from "uuid";
import {ChatContext} from "./chatContext";

export default function AppProvidersWrapper({children}: { children: React.ReactNode }) {
    const [cookies, setCookie] = useCookies(['uid']);
    const [currentUser, setCurrentUser] = useState<CurrentUser>({});
    const [currentChat, setCurrentChat] = useState<Chat>({} as Chat);
    const [timeline, setTimeline] = useState({} as TimelineType);
    const [isTimelineLoading, setIsTimelineLoading] = useState(false);
    const [searchSent, setSearchSent] = useState(false);

    const getTimelineData = useCallback(async () => {
        const {accessToken} = currentUser

        if (!accessToken) return

        let timeline = await getCurrentTimeline(accessToken)

        setIsTimelineLoading(true)

        const filteredTimeline = filterTimeline(timeline, {
            sort: {
                field: 'created_at',
                order: 'asc'
            }
        })
        let currentChat = get(filteredTimeline, 'chats[0]', {}) as Chat

        if (isEmpty(currentChat)) {
            await createBaseChat(accessToken)
            timeline = await getCurrentTimeline(accessToken)

            currentChat = get(timeline, 'chats[0]', {}) as Chat
        }

        setTimeline(timeline)
        setCurrentChat(currentChat)
        setIsTimelineLoading(false)
    }, [currentUser])

    const loginUser = useCallback(async () => {
        if (!cookies.uid) return

        const payload = JSON.stringify({email: cookies.uid})

        let loginUserResponse = await sendLoginUser(payload)

        if (loginUserResponse.error === "Invalid credentials") {
            await sendSignupUser(payload)
            await new Promise(resolve => setTimeout(resolve, 1000))
            loginUserResponse = await sendLoginUser(payload)
        }

        const {accessToken, refreshToken} = loginUserResponse

        if (accessToken) {
            setCurrentUser({
                accessToken,
                refreshToken
            })
        }
    }, [cookies.uid])

    useEffect(() => {
        if (!currentUser.accessToken) {
            const inferredUID = cookies.uid || `${uuidv4()}@consultapp.com`
            setCookie('uid', inferredUID, {path: '/', maxAge: 60 * 60 * 24 * 7})
            loginUser()
        } else {
            getTimelineData()
        }
    }, [cookies.uid, currentUser.accessToken, setCookie, loginUser, getTimelineData])

    const providerCtx = {
        timeline,
        setTimeline,
        currentChat,
        setCurrentChat,
        isTimelineLoading,
        setIsTimelineLoading,
        searchSent,
        setSearchSent
    }

    const clientOpts = {
        defaultOptions: {
            queries: {
                retry: false,
                staleTime: 6 * 1000,
                refetchInterval: 6 * 1000,
            },
        },
    }

    const [queryClient] = useState(() => new QueryClient(clientOpts));

    return (
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
            <ChatContext.Provider value={providerCtx}>
                <Sidebar/>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </ChatContext.Provider>
        </CurrentUserContext.Provider>
    );
}
