import { createContext, FC, ReactNode, useContext } from "react";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

interface SharedStateContextType {
    scrollY:Animated.SharedValue<number>,
    scrollYGlobal:Animated.SharedValue<number>,
    scrollToTop:() => void
}

const SharedStateContext = createContext<SharedStateContextType | undefined>(undefined)
export const SharedStateProvider:FC<{children:ReactNode}> = ({children}) => {
    const scrollY = useSharedValue(0)
    const scrollYGlobal = useSharedValue(0)

    const scrollToTop = () => {
        scrollY.value = withTiming(0, {duration:500})
        scrollYGlobal.value = withTiming(0, {duration:500})
    }

    return (
        <SharedStateContext.Provider value={{scrollY, scrollYGlobal, scrollToTop}}>
            {children}
        </SharedStateContext.Provider>
    )
}

export const useSharedState = () => {
    const context = useContext(SharedStateContext)
    if(context === undefined) throw new Error('useSharedState must be used within a SharedStateProvider')
    return context
}