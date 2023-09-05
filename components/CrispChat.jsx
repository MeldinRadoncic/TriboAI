"use client"

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";


export const CrispChat = () => {

    useEffect(() => {
        Crisp.configure("39f386c6-bb30-444f-bd8b-9c8e2178f2ed");
    }, []);

    return null;
}