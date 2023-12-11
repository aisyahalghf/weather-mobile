import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default Card = ({ icon, title, temp, description, weather }) => {
  const localStyle = makeStyle(title, weather);
  return (
    <View style={localStyle.container}>
      <View style={localStyle.flex}>
        <Ionicons name={icon} size={14} color='#ededed' />
        <Text style={localStyle.title}>{title}</Text>
      </View>
      <View style={localStyle.containerTemp}>
        <Text style={[localStyle.text, localStyle.fontSize]}>{temp}</Text>
        <Text style={[localStyle.text, localStyle.visibility]}>Km/hours</Text>
      </View>
      <Text style={localStyle.text}>{description}</Text>
    </View>
  );
};

const makeStyle = (title, weather) => {
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
      gap: 2,
    },
    containerTemp: {
      flexDirection: "row",
      gap: 5,
      alignItems: "center",
      marginBottom: 15,
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
    text: {
      color: "white",
    },
    visibility: {
      display: title === "Wind" ? "flex" : "none",
    },
  });
};
