import { StyleSheet, Text, View } from "react-native";

const Onboarding = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Onboarding & Setup</Text>
      <Text style={styles.subtitle}>
        Explore various onboarding flows, user setup processes, and welcome
        screens to create a great first impression for users.
      </Text>
    </View>
  );
};

export default Onboarding;

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
