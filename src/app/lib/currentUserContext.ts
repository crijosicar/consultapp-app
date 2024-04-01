'use client';

import {createContext, Dispatch, SetStateAction} from "react";

export type CurrentUser = {
    accessToken?: string;
    refreshToken?: string;
};

type CurrentUserContextType = {
    currentUser: CurrentUser;
    setCurrentUser: Dispatch<SetStateAction<CurrentUser>>;
}

export const CurrentUserContext = createContext<CurrentUserContextType>({} as CurrentUserContextType);