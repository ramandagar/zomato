import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Line, Svg } from 'react-native-svg'

const DottedLine = () => {
    return (
        <View style={styles.container}>
            <Svg
                width='100%'
                height='2'
            >
                <Line
                    stroke='#eee'
                    strokeWidth='2'
                    strokeDasharray='3,3'
                    x1='0'
                    y1='0'
                    x2='100%'
                    y2='0'
                />
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginTop: 15
    }
})

export default DottedLine