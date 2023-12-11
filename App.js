import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import Forecast from "./component/Forecast";
import SunsetCard from "./component/SunsetCard";
import Card from "./component/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import bgImage from "./assets/backgroundImage";
import * as Location from "expo-location";

export default function App() {
  const [dataWeather, setDataWeather] = useState("");
  const [main, setMain] = useState("");
  const [forecast, setForecast] = useState([]);
  const [visibility, setVisibility] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg(
          "Permission to access location was denied, please go to setting to allow using location."
        );
        return;
      }
      let response = await Location.getCurrentPositionAsync({});
      const location = {
        lat: response.coords.latitude,
        long: response.coords.longitude,
      };
      fetchDataWeather(location);
      fetchDataForecast(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  }

  const fetchDataWeather = async (location) => {
    try {
      const apiKey = process.env.RN_APP_WEATHER_API_KEY;
      const lat = location.lat;
      const long = location.long;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`
      );
      setDataWeather(response.data);
      setMain(response.data.weather[0]);
      setVisibility(false);
    } catch (error) {
      setErrorMsg("Internal Server Error");
      console.log(error);
    }
  };

  const fetchDataForecast = async (location) => {
    try {
      const lat = location.lat;
      const long = location.long;
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=530cb23d42a075c7e6565482dfb179ba`
      );
      setForecast(response.data.list);
    } catch (error) {
      console.log(error);
    }
  };

  const temp = (dataWeather?.main?.temp - 273.15).toFixed();
  const tempMax = (dataWeather?.main?.temp_max - 273.15).toFixed();
  const tempMin = (dataWeather?.main?.temp_min - 273.15).toFixed();
  const feelLike = (dataWeather?.main?.feels_like - 273.15).toFixed(1);

  const selectedBackground =
    bgImage[main?.main?.toLowerCase()] || bgImage.default;

  const localStyle = makeStyle(visibility);

  return (
    <ImageBackground
      source={{ uri: selectedBackground }}
      resizeMode='cover'
      style={localStyle.rootScreen}
      imageStyle={localStyle.ImageBackground}
    >
      <View style={[localStyle.container, localStyle.display2]}>
        <View style={localStyle.containerErr}>
          <Text style={localStyle.text}>{text}</Text>
        </View>
      </View>
      <View style={[localStyle.container, localStyle.display]}>
        <Text style={localStyle.title}>{dataWeather?.name}</Text>
        <Text style={localStyle.temp}>{temp}&#176;</Text>
        <Text style={localStyle.text}>{main?.main}</Text>
        <View style={localStyle.containerIcon}>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${main?.icon}@2x.png`,
            }}
            style={localStyle.image}
          />
          <Text style={localStyle.text}>{main?.description}</Text>
        </View>
        <View style={localStyle.flex}>
          <Text style={localStyle.text}>H: {tempMax}&#176;</Text>
          <Text style={localStyle.text}>L: {tempMin}&#176;</Text>
        </View>
        <Forecast data={forecast} weather={main?.main} />
        <View style={[localStyle.flex, localStyle.gap]}>
          <SunsetCard
            weather={main?.main}
            sunset={dataWeather?.sys?.sunset}
            sunrise={dataWeather?.sys?.sunrise}
          />
          <Card
            weather={main?.main}
            icon='aperture-outline'
            title='Wind'
            temp={dataWeather?.wind?.speed.toFixed(1)}
            description={
              dataWeather?.wind?.speed < 25
                ? "You can carry out your activities safely."
                : "Outdoor activities maybe very dangerous"
            }
          />
        </View>
        <View style={[localStyle.flex, localStyle.gap]}>
          <Card
            icon='thermometer-outline'
            title='FEELS LIKE'
            temp={`${feelLike}\u00B0`}
            description={
              feelLike < temp
                ? "Humidity make it coller"
                : "Humidity is making feel warmer."
            }
            weather={main?.main}
          />
          <Card
            weather={main?.main}
            icon='water-outline'
            title='Humidity'
            temp={dataWeather?.main?.humidity + "%"}
            description={
              dataWeather?.main?.humidity >= 30 &&
              dataWeather?.main?.humidity <= 60
                ? "Ideal humidity level"
                : "Less than ideal humidity levels"
            }
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const makeStyle = (visibility) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: !visibility ? 100 : 0,
      justifyContent: !visibility ? "" : "center",
    },
    display: {
      display: visibility ? "none" : "flex",
    },
    display2: {
      display: !visibility ? "none" : "flex",
    },
    containerErr: {
      backgroundColor: "#030712",
      opacity: 0.5,
      margin: 40,
      padding: 10,
      borderRadius: 10,
    },
    title: {
      color: "white",
      fontSize: 24,
      fontWeight: "600",
    },
    temp: {
      color: "white",
      fontSize: 70,
      fontWeight: "200",
    },
    containerIcon: {
      flexDirection: "row",
      gap: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    flex: {
      flexDirection: "row",
      gap: 5,
    },
    gap: {
      gap: 15,
    },
    text: {
      fontSize: 17,
      color: "white",
      fontWeight: "500",
    },
    rootScreen: {
      flex: 1,
    },
    ImageBackground: {
      opacity: 1,
    },
    image: {
      width: 40,
      height: 40,
    },
  });
};
