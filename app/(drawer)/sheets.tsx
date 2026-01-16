import { StyleSheet, Text, View } from "react-native";

const Sheets = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sheets & Modals</Text>
      <Text style={styles.subtitle}>
        Explore various sheet components, modal dialogs, and overlay techniques
        to create engaging user experiences.
      </Text>
    </View>
  );
};

export default Sheets;

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
