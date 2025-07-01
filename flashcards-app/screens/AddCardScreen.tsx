import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import uuid from "react-native-uuid";
import { FlashcardContext } from "../context/FlashCardContext";
import { RootStackParamList } from "../layout"; // or App.tsx

type Props = NativeStackScreenProps<RootStackParamList, "Add Card">;

export default function AddCardScreen({ navigation }: Props) {
  const { addCard } = useContext(FlashcardContext);

  // Local state for form fields
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Called when the user taps Save
  const handleSave = () => {
    if (!question.trim() || !answer.trim()) {
      Alert.alert("Error", "Both question and answer are required.");
      return;
    }

    // Create a new card object
    const newCard = {
      id: uuid.v4().toString(), // Use toString() to make sure it's treated as a string
      question,
      answer,
    };

    // Add it to context (and storage)
    addCard(newCard);

    // Clear form and go back to Home
    setQuestion("");
    setAnswer("");
    navigation.navigate("Flashcards");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✏️ Add a New Flashcard</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your question"
        value={question}
        onChangeText={setQuestion}
      />

      <TextInput
        style={[styles.input, styles.answerInput]}
        placeholder="Enter the answer"
        value={answer}
        onChangeText={setAnswer}
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>💾 Save Card</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  answerInput: {
    minHeight: 80,
    textAlignVertical: "top", // multiline support
  },
  saveButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
