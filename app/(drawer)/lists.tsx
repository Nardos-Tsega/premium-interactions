import { StyleSheet, Text, View } from "react-native";

const Lists = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lists & Data</Text>
      <Text style={styles.subtitle}>
        Explore various list components, data rendering techniques, and
        performance optimizations to create efficient user interfaces.
        techniques to create engaging user experiences.
      </Text>
    </View>
  );
};

export default Lists;

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
