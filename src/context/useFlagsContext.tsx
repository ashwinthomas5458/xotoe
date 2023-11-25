import React, { createContext, useContext, useMemo, useState } from 'react';
import { size } from '../styles';
type SizeProps = {
    width: number|string|undefined,
    height: number|string|undefined,
}
type AppFlagsType={
    showOnboardingScreen: boolean, 
    windowSizes: SizeProps,
    updateOnboardingFlag: (val: boolean)=>void,
    updateWindowSizes: (val: SizeProps)=>void
}

const DEFAULT_SIZE = {
    width: size.width,
    height: size.height
}

const DEFAULT_STATUS: AppFlagsType={
    showOnboardingScreen: true,
    windowSizes: DEFAULT_SIZE
}

export const FlagContext = createContext<AppFlagsType>(DEFAULT_STATUS);

export const FlagDataProvider =(props:any) =>{
    const [showOnboardingScreen, setShowOnboardingScreen] = useState(true);
    const [windowSizes, setWindowSizes] = useState<SizeProps>(DEFAULT_SIZE);

    const updateOnboardingFlag = ()=>{
        setShowOnboardingScreen(false);
    }
    
    const updateWindowSizes=(size: SizeProps)=>{
        setWindowSizes(size);
    }

    const flags: AppFlagsType|null = useMemo(() => ({
        showOnboardingScreen, windowSizes, updateOnboardingFlag, updateWindowSizes
    }), [showOnboardingScreen,windowSizes, updateOnboardingFlag, updateWindowSizes]);
    
    return(
        <FlagContext.Provider value={flags}>
            {props.children}
        </FlagContext.Provider>
    )
}

export default function useAppFlags() {
    return useContext(FlagContext);
}