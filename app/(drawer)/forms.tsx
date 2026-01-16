import { StyleSheet, Text, View } from "react-native";

const Forms = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forms & Inputs</Text>
      <Text style={styles.subtitle}>
        Explore various form elements, input fields, and validation techniques
        to create seamless user experiences.
      </Text>
    </View>
  );
};

export default Forms;

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
