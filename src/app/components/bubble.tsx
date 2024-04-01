import {ReactElement} from "react";
import Avatar from "@/app/components/avatar";
import {BubbleType} from "@/app/lib/types/bubble.type";

export default function Bubble({user, content}: BubbleType): ReactElement {
    const innerContent = user.name === 'ConsultApp'
        ? (<div className="grow mt-2 space-y-3" dangerouslySetInnerHTML={{__html: content}}></div>)
        : (<p>{content}</p>)

    return (
        <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="max-w-2xl flex gap-x-2 sm:gap-x-4">
                <Avatar {...user}/>
                {innerContent}
            </div>
        </div>
    );
}