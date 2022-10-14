import { createContext, useMemo, useState } from "react";

export const infoContext:any = createContext({
    poke: "",
    setPoke: ()=>{},
});

export default function Provider({children}:any){

    const[poke, setPoke] = useState();
    const value:any = useMemo(()=>({poke, setPoke}),[poke]);

    return(
        <infoContext.Provider value={value}>
            {children}
        </infoContext.Provider>
    )
}