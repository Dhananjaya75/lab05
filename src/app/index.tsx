import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const COLORS = {
  background: "#FFFFFF",
  surface: "#F8FAFC",
  text: "#1E293B",
  secondaryText: "#64748B",
  border: "#E2E8F0",
  rock: "#EF4444",
  paper: "#0D9488",
  scissors: "#D97706",
  vs: "#6366F1",
  win: "#0D9488",
  draw: "#D97706",
  lose: "#EF4444",
};

const CHOICES = [
  { name: "Rock", emoji: "✊", color: COLORS.rock },
  { name: "Paper", emoji: "✋", color: COLORS.paper },
  { name: "Scissors", emoji: "✌️", color: COLORS.scissors }
];  

export default function PlayScreen() {
  const [userChoice, setUserChoice] = useState<(typeof CHOICES)[number] | null>(null);
  const [computerChoice, setComputerChoice] = useState<(typeof CHOICES)[number] | null>(null);
  const [result, setResult] = useState("Make Your Move!");
  const [resultColor, setResultColor] = useState(COLORS.text);
  const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });

  const playGame = (choice: (typeof CHOICES)[number]) => {
    const randomNum - Math.floor(Math.random() * 3);
    const computerChoice = CHOICES[randomNum];
    setUserChoice(choice);
    setComputerChoice(computerChoice);

    if (choice.name === computerChoice.name) {
      setResult("It's a Draw!");
      setResultColor(COLORS.draw);
      setScore(prev => ({ ...prev, draws: prev.draws + 1 }));
    }else if ((choice.name === "Rock" && computerChoice.name === "Scissors") ||
              (choice.name === "Paper" && computerChoice.name === "Rock") ||
              (choice.name === "Scissors" && computerChoice.name === "Paper")
            ) 
              {
                setResult("You Win!");
                setResultColor(COLORS.win);
                setScore(prev => ({ ...prev, wins: prev.wins + 1 }));
              } else {
                setResult("Computer Wins!");
                setResultColor(COLORS.lose);
                setScore(prev => ({ ...prev, losses: prev.losses + 1 }));
              }
  };
  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult("Make Your Move!");
    setResultColor(COLORS.text);
    setScore({ wins: 0, losses: 0, draws: 0 });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>RPS Showdown</Text>
      <Text style={styles.subtitle}>rock Paper Scissors</Text>

      <View style={styles.scoreBoard}>
        <view style={styles.scoreColumn}>
          <Text style={styles.scorelabel}>Wins</Text>
          <Text style={styles.scoreValue, { color: COLORS.win }}>{score.wins}</Text>
        </view>

        <View style={styles.ScoreDivider} />

        
        <View style={styles.scoreColumn}>
          <Text style={styles.scoreLabel}>Draws</Text>
          <Text style={styles.scoreValue, { color: COLORS.draw }}>{score.draws}</Text>
        </View>
        <View style={styles.ScoreDivider} />

        <View style={styles.scoreColumn}>
          <Text style={styles.scoreLabel}>LOSSES</Text>
          <Text style={styles.scoreValue, { color: COLORS.lose }}>{score.losses}</Text>
        </View>
        </View>

        <view style={styles.playerSection}>
          <Text style={styles.playerTitle}>YOU</Text>
          <view style={[
            styles.emojiCircle,
            userChoice && {borderColor: userChoice.color, backgroundColor:'${userChoice.color}15'}
          ]}
          >
            <Text style={styles.emojiText}>{computerChoice ? computerChoice.emoji :'?'}
              </Text>
              </view>
              </view>

            <view style={[styles.resultContainer,{borderColor:'${resultColor}55'}]}>
              <Text style={[styles.resultText, {color: resultColor}]}>{result}</Text>
            </view>

            <Text style={StyleSheet.instructions}>Choose Your Weapon</Text>.

            <view style={styles.buttonContainer}>
              {CHOICES.map((choice) => (
                <TouchableOpacity
                  key={choice.name}
                  style={[styles.styles.button,{borderBottomColor: choice.color}]}
                  activeOpacity={0.75}
                  onpress={() => playGame(choice)}
                >
                  <Text style={styles.buttonEmoji}>{choice.emoji}</Text>
                  <Text style={styles.buttonText}>{choice.name}</Text>
                </TouchableOpacity>
              ))}
            </view>
            </View>

            const styles = StyleSheet.create({
              container: {
                flex: 1,
                backgroundColor: COLORS.background,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                paddingHorizontal: 16,
              },
              header: {
                fontSize: 32,
                fontWeight: '900',
                color: COLORS.text,
                letterSpacing: 0.5,
              },
              subtitle: {
                fontSize: 14,
                color: COLORS.secondaryText,
                marginTop: 5,
                marginBottom: 25,
              },
              scoreBoard: {
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                backgroundColor: COLORS.surface,
                paddingVertical: 18,
                borderRadius: 18,
                borderWidth: 1,
                borderColor: COLORS.border,
                marginBottom: 18,
              },
              scoreColumn: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              },
              scoreLabel: {
                fontSize: 11,
                color: COLORS.secondaryText,
                fontWeight: '800',
                letterSpacing: 1,
                marginBottom: 6,
              },