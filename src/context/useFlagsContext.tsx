import React, { createContext, useContext, useMemo, useState } from 'react';
import { size } from '../styles';
type SizeProps = {
    width: number|string|undefined,
    height: number|string|undefined,
}
type AppFlagsType={
    showOnboardingScreen: boolean, 
    windowSize: SizeProps,
    updateOnboardingFlag: (val: boolean)=>void,
    updateWindowSizes: (val: SizeProps)=>void
}

const DEFAULT_SIZE = {
    width: size.width,
    height: size.height
}

const DEFAULT_STATUS: AppFlagsType={
    showOnboardingScreen: true,
    windowSize: DEFAULT_SIZE
}

export const FlagContext = createContext<AppFlagsType>(DEFAULT_STATUS);

export const FlagDataProvider =(props:any) =>{
    const [showOnboardingScreen, setShowOnboardingScreen] = useState(true);
    const [windowSize, setWindowSize] = useState<SizeProps>(DEFAULT_SIZE);

    const updateOnboardingFlag = ()=>{
        setShowOnboardingScreen(false);
    }
    
    const updateWindowSizes=(size: SizeProps)=>{
        setWindowSize(size);
    }

    const flags: AppFlagsType|null = useMemo(() => ({
        showOnboardingScreen, windowSize, updateOnboardingFlag, updateWindowSizes
    }), [showOnboardingScreen,windowSize, updateOnboardingFlag, updateWindowSizes]);
    
    return(
        <FlagContext.Provider value={flags}>
            {props.children}
        </FlagContext.Provider>
    )
}

export default function useAppFlags() {
    return useContext(FlagContext);
}