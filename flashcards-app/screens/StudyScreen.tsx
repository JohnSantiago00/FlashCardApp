import { FlashcardContext } from "@/context/FlashCardContext";
import React, { useContext, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";

// Fisher-Yates Shuffle Algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function StudyScreen() {
  const { cards } = useContext(FlashcardContext);

  // Shuffle once on mount
  const [shuffledCards, setShuffledCards] = useState(() => shuffleArray(cards));
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentCard = shuffledCards[index];

  const goToNextCard = () => {
    setShowAnswer(false);
    setIndex((prev) => (prev + 1) % shuffledCards.length);
  };

  const handleShuffle = () => {
    const reshuffled = shuffleArray(cards);
    setShuffledCards(reshuffled);
    setIndex(0);
    setShowAnswer(false);
  };

  // Show message if there are no cards
  if (shuffledCards.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>🧠 Study Mode</Text>
        <Text style={styles.emptyMessage}>
          You have no flashcards yet. Add some to begin studying!
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🧠 Study Mode</Text>
      <Text style={styles.progress}>
        Card {index + 1} of {shuffledCards.length}
      </Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => setShowAnswer(!showAnswer)}
        activeOpacity={0.8}
      >
        <Text style={styles.cardLabel}>
          {showAnswer ? "Answer" : "Question"}
        </Text>
        <Text style={styles.cardText}>
          {showAnswer ? currentCard.answer : currentCard.question}
        </Text>
        <Text style={styles.flipHint}>
          Tap to {showAnswer ? "hide" : "reveal"} answer
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.shuffleButton} onPress={handleShuffle}>
        <Text style={styles.shuffleButtonText}>🔀 Shuffle Cards</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextButton} onPress={goToNextCard}>
        <Text style={styles.nextButtonText}>Next ➡️</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f8f8fc",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  progress: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  emptyMessage: {
    fontSize: 16,
    color: "gray",
    marginTop: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  card: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  cardLabel: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 24,
    textAlign: "center",
    color: "#333",
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  flipHint: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 20,
  },
  shuffleButton: {
    backgroundColor: "#ff9f0a",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 10,
  },
  shuffleButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  nextButton: {
    backgroundColor: "#34C759",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 24,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
