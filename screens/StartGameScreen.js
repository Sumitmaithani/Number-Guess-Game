import { useState } from "react";
import { View, StyleSheet, Text, TextInput, Button, Alert } from "react-native";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";

const StartGameScreen = ({ onPickedNumber }) => {
  const [inputNumber, setInputNumber] = useState("");

  function inputNumberHandler(enteredNumber) {
    setInputNumber(enteredNumber);
  }

  function resetHandler() {
    setInputNumber("");
  }

  function confirmHandler() {
    const chosenNumber = parseInt(inputNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number",
        "Number has to be a number between 1 to 99.",
        [{ title: "Okay", style: "destructive", onPress: resetHandler }]
      );
    } else {
      onPickedNumber(chosenNumber);
    }
  }

  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>
      <Card>
        <InstructionText>Enter a Number</InstructionText>
        <View>
          <TextInput
            style={styles.numberInput}
            maxLength={2}
            keyboardType="number-pad"
            value={inputNumber}
            onChangeText={inputNumberHandler}
          />
        </View>
        <View style={styles.centerButton}>
          <View style={styles.button}>
            <PrimaryButton onPress={resetHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.button}>
            <PrimaryButton onPress={confirmHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  centerButton: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    flex: 1,
  },
});
