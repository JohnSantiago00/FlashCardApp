import { FlashcardContext } from "@/context/FlashCardContext";
import React, { useContext } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function MyCardsScreen() {
  const { cards } = useContext(FlashcardContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>📚 My Flashcards</Text>

      {cards.length === 0 ? (
        <Text style={styles.emptyText}>You haven’t created any cards yet.</Text>
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.question}>Q: {item.question}</Text>
              <Text style={styles.answer}>A: {item.answer}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  emptyText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 40,
  },
  card: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  answer: {
    fontSize: 16,
    color: "gray",
  },
});
