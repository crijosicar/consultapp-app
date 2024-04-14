'use client';

import {useCallback, useEffect, useState} from "react";
import Sidebar from "@/app/components/sidebar";
import {CurrentUser, CurrentUserContext} from "@/app/lib/currentUserContext";
import {Chat, TimelineType} from "@/app/lib/types/timeline.type";
import {createBaseChat, getCurrentTimeline} from "@/app/services/chats";
import {filterTimeline} from "@/app/lib/chats.util";
import {get, isEmpty} from "lodash";
import {sendLoginUser, sendSignupUser} from "@/app/services/auth";
import {v4 as uuidv4} from "uuid";
import {ChatContext} from "./chatContext";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {useLocalStorage} from "@uidotdev/usehooks";
import {useCookies} from "next-client-cookies";

export default function AppProvidersWrapper({children}: { children: React.ReactNode }) {
    const [currentChatLS, setCurrentChatLS] = useLocalStorage("currentChat", "");
    const cookies = useCookies();
    const [currentUser, setCurrentUser] = useState<CurrentUser>({} as CurrentUser);
    const [currentChat, setCurrentChat] = useState<Chat>(() => {
        return (!isEmpty(currentChatLS) ? JSON.parse(currentChatLS) : "{}") as Chat
    })
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
        setCurrentChatLS(JSON.stringify(currentChat))
        setIsTimelineLoading(false)
    }, [currentUser])

    const loginUser = useCallback(async () => {
        if (!cookies.get('uid')) return

        const payload = JSON.stringify({email: cookies.get('uid')})

        let loginUserResponse = await sendLoginUser(payload)

        if (loginUserResponse.error === "Invalid credentials") {
            await sendSignupUser(payload)
            await new Promise(resolve => setTimeout(resolve, 1000))
            loginUserResponse = await sendLoginUser(payload)
        }

        const {accessToken} = loginUserResponse

        if (accessToken) {
            setCurrentUser({
                accessToken,
            })
            cookies.set('accessToken', accessToken, {path: '/'})
        }
    }, [cookies])

    const isValidToken = (token: string) => {
        try {
            const decodedToken = jwtDecode<JwtPayload>(token)
            const currentTime = Date.now() / 1000

            return decodedToken && decodedToken.exp && (decodedToken.exp > currentTime);
        } catch (e) {
            console.log(`Error decoding token: ${e}`)
            return false
        }

    }

    const getUserUid = () => cookies.get('uid') || `${uuidv4()}@consultapp.com`;

    useEffect(() => {
        // const currentChatCookie = JSON.parse(cookies.get('currentChat') as string) as Chat
        // console.log({currentChatCookie})
        //
        // if (!isEmpty(currentChatCookie)) {
        //     setCurrentChat(currentChatCookie)
        // }
    }, [cookies]);

    useEffect(() => {
        const accessTokenCookie = cookies.get('accessToken');
        const arefreshTokenCookie = cookies.get('refreshToken');

        if (isEmpty(currentUser.accessToken) && !isEmpty(accessTokenCookie) && isValidToken(`${accessTokenCookie}`)) {
            setCurrentUser({
                accessToken: accessTokenCookie,
                refreshToken: arefreshTokenCookie
            })
            getTimelineData()
        } else {
            const isValidAccessToken = !isEmpty(currentUser.accessToken) && isValidToken(`${currentUser.accessToken}`)
            const shouldAttemptLoginUser = isEmpty(currentUser.accessToken) || !isValidAccessToken

            if (shouldAttemptLoginUser) {
                const uid = getUserUid()
                cookies.set('uid', uid, {path: '/'})
                loginUser()
            } else if (isEmpty(currentChat)) {
                getTimelineData()
            }
        }
    }, [cookies, currentUser.accessToken, loginUser, getTimelineData])

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

    return (
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
            <ChatContext.Provider value={providerCtx}>
                <Sidebar/>
                {children}
            </ChatContext.Provider>
        </CurrentUserContext.Provider>
    );
}
