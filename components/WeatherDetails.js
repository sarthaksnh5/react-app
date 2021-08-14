import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {colors} from '../utils/index'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors

export default function WeatherDetails({currentWeather, unitsSystem}) {
    const {
        main: { feels_like , humidity, pressure },
        wind: {speed},
    } = currentWeather

    const wind_speed = unitsSystem === 'metric' ? `${Math.round(speed)} m/s` : `${Math.round(speed)} miles/h`

    return (
        <View style={styles.weatherDetials}>
            <View style={{ ... styles.weatherDetialsRow,borderBottomWidth: 1, borderBottomColor: BORDER_COLOR}}>
                <View style={{ ... styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR }}>
                    <View style={styles.weatherDetialsRow}>
                        <FontAwesome5 name="temperature-low" size={25} color={PRIMARY_COLOR} />
                        <View style={styles.weatherDetialsColumn}>    
                            <Text>Feels_like: </Text>
                            <Text style={styles.textSecondary}>{feels_like}</Text>
                        </View>
                    </View>
                </View> 
                <View style={styles.weatherDetailsBox}>
                    <View style={styles.weatherDetialsRow}>
                        <MaterialCommunityIcons name="water" size={25} color={PRIMARY_COLOR} />
                        <View style={styles.weatherDetialsColumn}>    
                            <Text>Humidity: </Text>
                            <Text style={styles.textSecondary}>{humidity} %</Text>
                        </View>
                    </View>                        
                </View>   
            </View>
            <View style={styles.weatherDetialsRow}>
                <View style={{ ... styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR }}>
                    <View style={styles.weatherDetialsRow}>
                        <MaterialCommunityIcons name="weather-windy" size={25} color={PRIMARY_COLOR} />
                        <View style={styles.weatherDetialsColumn}>    
                            <Text>Wind Speed: </Text>
                            <Text style={styles.textSecondary}>{wind_speed}</Text>
                        </View>
                    </View>
                </View> 
                <View style={styles.weatherDetailsBox}>
                    <View style={styles.weatherDetialsRow}>
                        <MaterialCommunityIcons name="speedometer" size={25} color={PRIMARY_COLOR} />
                        <View style={styles.weatherDetialsColumn}>    
                            <Text>Pressur: </Text>
                            <Text style={styles.textSecondary}>{pressure} hPa</Text>
                        </View>
                    </View>                        
                </View>   
            </View>
                      
        </View>
    )
}

const styles = StyleSheet.create({
    weatherDetials: {
        marginTop: 'auto',
        margin: 15,
        borderWidth: 2,
        borderColor: BORDER_COLOR,
        borderRadius: 10,
        width: 300,
    },
    weatherDetialsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    weatherDetialsColumn: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    weatherDetailsBox: {
        flex: 1,
        padding: 20
    },
    textSecondary:{
        fontSize: 25,
        color: SECONDARY_COLOR
    }
})