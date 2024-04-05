'use client';

import {ReactElement, useContext, useEffect, useRef} from "react";
import {v4 as uuidv4} from 'uuid';
import Bubble from "@/app/components/bubble";
import {BubbleType} from "@/app/lib/types/bubble.type";
import {ChatContext} from "@/app/lib/chatContext";
import {map} from "lodash";
import ChatLoading from "@/app/components/chat-loading";

export default function Timeline(): ReactElement {
    const {currentChat, isTimelineLoading, searchSent} = useContext(ChatContext);
    const {timeline} = currentChat;
    const endOfTimelineRef = useRef(null);

    useEffect(() => {
        if ((isTimelineLoading || timeline) && endOfTimelineRef.current) {
            // @ts-ignore
            endOfTimelineRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [timeline, isTimelineLoading, searchSent]);

    return (
        <ul className="mt-16 space-y-5">
            {map(timeline, (bubble: BubbleType, index) => {
                const isLastElement = index === timeline!.length - 1;
                return <li className="py-2 sm:py-4" ref={isLastElement ? endOfTimelineRef : null}>
                    <Bubble key={bubble.id} {...bubble}/>
                </li>
            })}
            {(searchSent && isTimelineLoading) &&
                <li className="py-2 sm:py-4" key={uuidv4()}>
                    <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto">
                        <ChatLoading/>
                    </div>
                </li>}
        </ul>
    )
}