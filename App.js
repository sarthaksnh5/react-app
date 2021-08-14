import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';
import { colors } from '../weather-app-reat/utils/index'
import ReloadIcon from './components/ReloadIcon';
import WeatherDetails from './components/WeatherDetails';
import { apiKey } from 'react-native-dotenv'

const {PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors

const baseURL = "https://api.openweathermap.org/data/2.5/weather?"

export default function App() {

  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null) 
  const [unitsSystem, setUnitsSystem] = useState('metric')

  useEffect(() => {
    load()
  }, [unitsSystem])

  async function load(){
    setCurrentWeather(null)
    setErrorMessage(null)
    try{
      let {status} = await Location.requestForegroundPermissionsAsync()
      
      if(status != "granted"){
        setErrorMessage('Access to location is need to run the app')
        return
      }
      const location = await Location.getCurrentPositionAsync()

      const {latitude, longitude} = location.coords
      //alert(`Latitude: ${latitude}, Longitude: ${longitude} `)
      const weatherUrl  = `${baseURL}lat=${latitude}&lon=${latitude}&units=${unitsSystem}&appid=${apiKey}`
      console.log(weatherUrl)
      const response = await fetch(weatherUrl)

      const result = await response.json()      

      if(response.ok){
        setCurrentWeather(result)
        
        console.log("Weather")
      }
      else{
        setErrorMessage(result.errorMessage)
        console.log("Error")
      }
    }
    catch(error){
      setErrorMessage(error.message)
    }
  }

  if(currentWeather){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>  
          <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />        
          <ReloadIcon load={load}/>
          <WeatherInfo currentWeather={currentWeather} />
        </View>   
        <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem} />     
      </View>
    );
  }
  else if(errorMessage){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>{ errorMessage }</Text>
        <ReloadIcon load={load}/>
      </View>
    );
  }
  else{
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ActivityIndicator size='large' color={colors.PRIMARY_COLOR}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main:{
    justifyContent: 'center',
    flex:1,
    width: 100
  }
});
