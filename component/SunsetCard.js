import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const formatTime = (time, sort) => {
  const date = new Date(time * 1000);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  if (sort) {
    return hours;
  }
  return `${hours}:${minutes}`;
};
export default SunsetCard = ({ sunrise, sunset, weather }) => {
  const localStyle = makeStyle(weather);
  return (
    <View style={localStyle.container}>
      <View style={localStyle.flex}>
        <Ionicons name='partly-sunny-outline' size={14} color='#ededed' />
        <Text style={localStyle.title}>SUNSET</Text>
      </View>
      <Text style={[localStyle.text, localStyle.fontSize]}>
        {formatTime(sunrise)}
      </Text>
      <View style={localStyle.decoration}></View>
      <Text style={localStyle.text}>Sunrise : {formatTime(sunset)}</Text>
    </View>
  );
};

const makeStyle = (weather) => {
  return StyleSheet.create({
    container: {
      width: 170,
      padding: 10,
      marginTop: 20,
      backgroundColor:
        weather === "Clear" || weather === "Clouds" ? "#1180d4" : "#030712",
      opacity: 0.9,
      borderRadius: 8,
      alignItems: "flex-start",
    },
    flex: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 5,
    },
    title: {
      color: "white",
      fontSize: 12,
      paddingBottom: 5,
      opacity: 0.6,
    },
    fontSize: {
      fontSize: 20,
      fontWeight: "500",
    },
    decoration: {
      marginVertical: 15,
      backgroundColor: "white",
      height: 1,
      width: 145,
    },

    text: {
      color: "white",
    },
  });
};
