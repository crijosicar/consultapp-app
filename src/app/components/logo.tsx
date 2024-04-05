import {ReactElement} from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Logo(): ReactElement {
    return (
        <Image className="w-auto h-auto" src={logo} alt={'Logo for ConsultApp'}/>
    )
}