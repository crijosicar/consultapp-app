import {ReactElement} from "react";
import {BubbleUserType} from "@/app/lib/types/bubble.type";
import avatar from "@/assets/avatar.png";
import Image from "next/image";

export default function Avatar(user: BubbleUserType): ReactElement {
    if (user.name === 'ConsultApp') {
        return (
            <Image className="w-12 h-10" src={avatar} alt={'Avatar'}/>
        )
    }

    return (
        <span className="flex-shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600">
            <span className="text-sm font-medium text-white leading-none">
                {user.name.charAt(0).toUpperCase()}
            </span>
        </span>
    )
}