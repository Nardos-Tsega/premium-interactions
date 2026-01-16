import { StyleSheet, Text, View } from "react-native";

const Navigation = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Navigation & Routing</Text>
      <Text style={styles.subtitle}>
        Explore various navigation components, routing techniques, and
        navigation patterns to create seamless user experiences.
      </Text>
    </View>
  );
};

export default Navigation;

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
