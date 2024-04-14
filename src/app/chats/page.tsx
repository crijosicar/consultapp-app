'use client';

import {ReactElement, useCallback, useContext, useEffect} from "react";
import {ChatContext} from "@/app/lib/chatContext";
import ChatRow from "@/app/components/chat-row";
import {isEmpty} from "lodash";
import {getCurrentTimeline} from "@/app/services/chats";
import {CurrentUserContext} from "@/app/lib/currentUserContext";

export default function Chats(): ReactElement {
    const {timeline, setTimeline} = useContext(ChatContext);
    const {currentUser} = useContext(CurrentUserContext);

    const fetchCurrentTimeline = useCallback(async () => {
        if (currentUser.accessToken) {
            const timeline = await getCurrentTimeline(currentUser.accessToken)
            setTimeline(timeline)
        }
    }, [currentUser])

    useEffect(() => {
        if (isEmpty(timeline)) {
            fetchCurrentTimeline()
        }
    }, [timeline, fetchCurrentTimeline]);

    return (
        <div className="relative h-screen w-full lg:ps-64">
            <div className="py-10 lg:py-14">
                <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto text-center">
                    <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
                        History
                    </h1>
                    <p className="mt-3 text-gray-600 dark:text-gray-400">
                        History of your chats
                    </p>
                </div>
                <div className="m-20 flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            {isEmpty(timeline) ? (
                                <div
                                    className="min-h-60 flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                                    <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
                                        <div className="flex justify-center">
                                            <div
                                                className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                                                role="status" aria-label="loading">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th scope="col"
                                                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">ID
                                                </th>
                                                <th scope="col"
                                                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Timeline
                                                </th>
                                                <th scope="col"
                                                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Created
                                                    At
                                                </th>
                                                <th scope="col"
                                                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {(timeline.chats || []).map((chat) => <ChatRow chat={chat} key={chat.id}/>)}
                                            </tbody>
                                        </table>
                                        <div
                                            className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                                                      {timeline.chats.length}
                                                    </span>{" "}
                                                    results
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}
