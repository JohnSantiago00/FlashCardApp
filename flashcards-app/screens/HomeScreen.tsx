import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../layout";

type Props = NativeStackScreenProps<RootStackParamList, "Flashcards">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      {/* App Title */}
      <Text style={styles.title}>🧠 Welcome to FlashMaster</Text>

      {/* Subheading / Slogan */}
      <Text style={styles.subtitle}>
        Master anything by flipping your own flashcards!
      </Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Add Card")}
        >
          <Text style={styles.buttonText}>+ Create a Flashcard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.studyButton]}
          onPress={() => navigation.navigate("Study")}
        >
          <Text style={styles.buttonText}>🎯 Study Now</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.myCardsButton]}
          onPress={() => navigation.navigate("My Cards")}
        >
          <Text style={styles.buttonText}>📋 View My Cards</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 40,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: "100%",
    gap: 14,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  studyButton: {
    backgroundColor: "#34C759",
  },
  myCardsButton: {
    backgroundColor: "#FF9500",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
