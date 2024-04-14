'use client';

import {ReactElement, useContext, useEffect, useLayoutEffect, useRef} from "react";
import {v4 as uuidv4} from 'uuid';
import Bubble from "@/app/components/bubble";
import {BubbleType} from "@/app/lib/types/bubble.type";
import {ChatContext} from "@/app/lib/chatContext";
import {isEmpty, map} from "lodash";
import ChatLoading from "@/app/components/chat-loading";
import {useWindowScroll, useWindowSize} from "@uidotdev/usehooks";

export default function Timeline(): ReactElement {
    const {currentChat, isTimelineLoading, searchSent} = useContext(ChatContext);
    const {timeline} = currentChat;
    const [, scrollTo] = useWindowScroll();
    const endOfTimelineRef = useRef(null);

    useLayoutEffect(() => {
        if ((isTimelineLoading || timeline) && endOfTimelineRef.current) {
            // @ts-ignore
            scrollTo({left: 0, top: endOfTimelineRef.current.clientHeight, behavior: "smooth"})
        }

    }, [timeline, isTimelineLoading, searchSent]);

    //

    return (
        <ul className="m-40 space-y-5">
            {map(timeline, (bubble: BubbleType, index) => {
                const isLastElement = index === timeline!.length - 1;
                return <li key={bubble.id} className="py-2 sm:py-4" ref={isLastElement ? endOfTimelineRef : null}>
                    <Bubble {...bubble}/>
                </li>
            })}
            {(searchSent && isTimelineLoading) || isEmpty(timeline) &&
                <li className="py-2 sm:py-4" key={uuidv4()}>
                    <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto">
                        <ChatLoading/>
                    </div>
                </li>}
        </ul>
    )
}