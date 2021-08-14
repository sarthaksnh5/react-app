import React from 'react'
import { View, Platform, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../utils/index'

const {PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors

export default function ReloadIcon({load}) {

    const refreshIconsName = Platform.OS == 'ios' ? 'ios-refresh' : 'md-refresh'

    return (
        <View style={styles.relaodIcon}>
            <Ionicons onPress={load} name={refreshIconsName} size={24} color={colors.PRIMARY_COLOR} />
        </View>
    )
}

const styles = StyleSheet.create({
    relaodIcon: {
        position: 'absolute',
        top: 100,
        right: 40,
    }
})
