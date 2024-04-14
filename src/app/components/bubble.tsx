import {ReactElement} from "react";
import Avatar from "@/app/components/avatar";
import {BubbleType} from "@/app/lib/types/bubble.type";

export default function Bubble({user, content}: BubbleType): ReactElement {
    const innerContent = user.name === 'ConsultApp'
        ? (<div className="grow mt-2 space-y-3" dangerouslySetInnerHTML={{__html: content}}></div>)
        : (<p>{content}</p>)

    return (user.name === 'ConsultApp' ?
            <div className="max-w-lg flex gap-x-2 sm:gap-x-4 me-11">
                <Avatar {...user}/>
                <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3">
                    <h2 className="font-medium text-gray-800">ConsultApp</h2>
                    <div className="space-y-1.5">
                        {innerContent}
                    </div>
                </div>
            </div> :
            <div className="flex ms-auto gap-x-2 sm:gap-x-4">
                <div className="grow text-end space-y-3">
                    <h2 className="font-medium text-gray-800">{user.name}</h2>
                    <div className="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
                        <div className="text-sm text-white">{innerContent}</div>
                    </div>
                </div>
                <Avatar {...user}/>
            </div>
    );
}