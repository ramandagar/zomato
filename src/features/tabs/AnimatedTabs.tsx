import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { SharedStateProvider } from './SharedContext'
import UserBottomTab from './UserBottomTab'

const AnimatedTabs:FC = () => {
  return (
    <SharedStateProvider>
        <UserBottomTab />
    </SharedStateProvider>
  )
}

export default AnimatedTabs