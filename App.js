import { StatusBar } from "expo-status-bar";
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";
import { useFonts } from 'expo-font';
import AppLoading from "expo-app-loading";

export default function App() {
const [userNumber, setUserNumber] = useState();
const [gameIsOver, setGameIsOver] = useState(true);
const [guessRounds, setGuessRounds] = useState(0);
// const [fontsLoaded] = useFonts({
//   'open-sans': require('./assets/fonts/OpenSans-Regular.tff'),
//   'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
// });

// if (!fontsLoaded) {
//   return <AppLoading />
// }

function pickedNumberHandler(pickedNumber){
  setUserNumber(pickedNumber);
  setGameIsOver(false);
}

function gameIsOverHandler(){
  setGameIsOver(true);
}

function startNewGameHandler(){
  setUserNumber(null);
  setGuessRounds(0);
}

let screen = <StartGameScreen onPickedNumber={pickedNumberHandler} />

if(userNumber){
  screen = <GameScreen userNumber={userNumber} onGameOver={gameIsOverHandler} />
}

if(gameIsOver && userNumber){
  screen = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onStartNewGame={startNewGameHandler} />
}

  return (
    <LinearGradient colors={[Colors.accent800, Colors.accent500]} style={styles.rootScreen}>
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.bacgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  bacgroundImage: {
    opacity: 0.15
  },
});
