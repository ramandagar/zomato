import { View, Text, StyleSheet, Dimensions, Modal, TouchableOpacity, Platform, Pressable } from 'react-native'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { screenHeight } from '@unistyles/Constants'
import Icon from '@components/global/Icon'
import { BlurView } from '@react-native-community/blur'

const CustomModal = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)
    const [content, setContent] = useState(null)

    useImperativeHandle(ref, () => ({
        openModal: (content: any) => {
            setContent(content)
            setVisible(true)
        },
        closeModal: () => {
            setVisible(false)
        }
    }))


    return (
        <Modal
            visible={visible}
            animationType='slide'
            onRequestClose={() => setVisible(false)}
            transparent={true}
        >
           {Platform.OS === 'ios' && 
           <BlurView style={styles.absolute} blurType='light' blurAmount={10}/>
           }
            <View style={styles.modalContainer}>
                <View style={styles.contentContainer}>
                    <TouchableOpacity
                        onPress={() => setVisible(false)}
                        style={styles.closeIcon}
                    >
                        <Icon color='white' name='close' size={24} iconFamily='Ionicons' />
                    </TouchableOpacity>
                    {
                        content ? (
                            <View style={styles.modalContent}>
                                {content}
                            </View>
                        ) : (
                            <Text style={styles.placeholderText}>No content Provided</Text>
                        )
                    }
                </View>
            </View>
        </Modal>
    )
})

const styles = StyleSheet.create({
    modalContent: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
        maxHeight: screenHeight * 0.7,
        minHeight: 150,
        width: '100%'
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end', 
    },
    contentContainer: {
        width: '100%',
        maxHeight: screenHeight * 0.7,
        minHeight: 150,
        borderRadius: 10
    },
    placeholderText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        fontFamily: 'Okra-Medium'
    },
    closeIcon: {
        position: 'absolute',
        top: -60,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 200,
        zIndex:1
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
})

export default CustomModal