import React, { createContext, useContext, useMemo, useState } from 'react';

interface AppFlagsType{
    showOnboardingScreen: boolean, 
    updateOnboardingFlag: (val: boolean)=>void
}

const DEFAULT_STATUS: AppFlagsType={
    showOnboardingScreen: true
}

export const FlagContext = createContext<AppFlagsType>(DEFAULT_STATUS);

export const FlagDataProvider =(props:any) =>{
    const [showOnboardingScreen, setShowOnboardingScreen] = useState(true);

    const updateOnboardingFlag = ()=>{
        setShowOnboardingScreen(false);
    }

    const flags: AppFlagsType|null = useMemo(() => ({
        showOnboardingScreen, updateOnboardingFlag
    }), [showOnboardingScreen, updateOnboardingFlag]);
    
    return(
        <FlagContext.Provider value={flags}>
            {props.children}
        </FlagContext.Provider>
    )
}

export default function useAppFlags() {
    return useContext(FlagContext);
}