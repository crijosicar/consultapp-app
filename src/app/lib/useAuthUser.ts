'use client';

import {useContext} from "react";
import {CurrentUserContext} from "@/app/lib/currentUserContext";
import {jwtDecode} from "jwt-decode";

type AuthUserType = {
    exp: number;
    iat: number;
    id: number;
    roles: string[];
    sub: string;
}

export default function useAuthUser(): AuthUserType | undefined {
    const {currentUser} = useContext(CurrentUserContext);

    if (!currentUser) {
        throw new Error(
            "useCurrentUser has to be used within <CurrentUserContext.Provider>"
        );
    }

    const {accessToken} = currentUser;

    if (accessToken) {
        return jwtDecode(accessToken) as AuthUserType;
    }

    return undefined;
}