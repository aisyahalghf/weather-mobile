import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { formatTime } from "./SunsetCard";

const handleRender = (data, localStyle) => {
  const icon = data?.weather[0].icon;
  const temp = (data.main.temp - 273.15).toFixed();
  const time = formatTime(data.dt, (sort = true));

  const now = new Date().getDay();
  const forecaseDay = new Date(data.dt * 1000).getDay();

  if (now === forecaseDay) {
    return (
      <View style={localStyle.flex}>
        <Text style={localStyle.text}>{time}</Text>
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${icon}@2x.png`,
          }}
          style={localStyle.image}
        />
        <Text style={localStyle.text}>{temp}&#176;</Text>
      </View>
    );
  }
};

export default ForeCast = ({ data, weather }) => {
  const localStyle = makeStyle(weather);
  return (
    <View style={localStyle.container}>
      <View style={localStyle.innerContainer}>
        <Text style={localStyle.title}>3-HOUR FORECAST</Text>
        <FlatList
          data={data}
          renderItem={(data) => handleRender(data.item, localStyle)}
          horizontal={true}
        />
      </View>
    </View>
  );
};

const makeStyle = (weather) => {
  return StyleSheet.create({
    container: {
      width: 350,
      padding: 10,
      marginTop: 40,
      marginHorizontal: 20,
      backgroundColor:
        weather === "Clear" || weather === "Clouds" ? "#1180d4" : "#030712",
      opacity: 0.9,
      borderRadius: 8,
      alignItems: "flex-start",
      height: 130,
      justifyContent: "center",
      alignItems: "center",
    },
    innerContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      width: "full",
      color: "white",
      fontSize: 12,
      borderBottomWidth: 1,
      borderBottomColor: "white",
      paddingBottom: 5,
      opacity: 0.6,
    },
    flex: {
      alignItems: "center",
      marginTop: 5,
    },
    text: {
      color: "white",
      fontSize: 14,
      fontWeight: "800",
    },
    image: {
      width: 40,
      height: 40,
    },
  });
};
