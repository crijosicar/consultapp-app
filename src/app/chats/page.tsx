'use client';

import {ReactElement, useContext} from "react";
import {ChatContext} from "@/app/lib/chatContext";
import ChatRow from "@/app/components/chat-row";

export default function Chats(): ReactElement {
    const {timeline} = useContext(ChatContext);

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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}
