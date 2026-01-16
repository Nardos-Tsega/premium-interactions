import { StyleSheet, Text, View } from "react-native";

const Time = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Time & Date</Text>
      <Text style={styles.subtitle}>
        Explore various time and date components, calendar views, and time
        pickers to create a seamless user experience.
      </Text>
    </View>
  );
};

export default Time;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
});
