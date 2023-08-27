import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHorse,
  faDog,
  faCat,
  faFish,
  faCocktail,
} from '@fortawesome/free-solid-svg-icons';

interface Horse {
  id: number;
  position: number;
  speed: number;
}

const HorseRace: React.FC = () => {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [winner, setWinner] = useState<number | null>(null);
  const [selectedHorse, setSelectedHorse] = useState<number | null>(null);
  const [raceStarted, setRaceStarted] = useState<boolean>(false);
  const [raceFinished, setRaceFinished] = useState<boolean>(false);

  useEffect(() => {
    const initialHorses: Horse[] = Array.from({ length: 5 }, (_, index) => ({
      id: index,
      position: 0,
      speed: 0,
    }));
    setHorses(initialHorses);
  }, []);

  useEffect(() => {
    if (raceStarted) {
      const updatedHorses = horses.map((horse: Horse) => ({
        ...horse,
        speed: Math.random() * 1.5 + 0.05,
      }));
      setHorses(updatedHorses);
    }
  }, [raceStarted]);

  useEffect(() => {
    const winningHorse = horses.find((horse: Horse) => horse.position >= 90);

    if (winningHorse) {
      if (winningHorse.position >= 90) {
        setWinner(winningHorse.id);
      }
      setRaceStarted(false);
      setRaceFinished(true);
    }
  }, [horses]);

  useEffect(() => {
    const moveHorses = setInterval(() => {
      if (raceStarted && winner === null) {
        setHorses((prevHorses: Horse[]) =>
          prevHorses.map((horse) => {
            if (horse.position <= 90) {
              horse.position += horse.speed;
            }
            return horse;
          })
        );
      }
    }, 100);

    if (winner !== null) {
      clearInterval(moveHorses);
    }

    return () => clearInterval(moveHorses);
  }, [winner, raceStarted]);

  const handleBet = (horseId: number) => {
    if (raceStarted) {
      if (horseId === winner) {
        alert("Congratulations! You've won!");
      } else {
        alert("Better luck next time!");
      }
    }
    setSelectedHorse(horseId);
  };

  const startRace = () => {
    if (selectedHorse !== null && !raceFinished) {
      setWinner(null);
      setHorses((prevHorses: Horse[]) =>
        prevHorses.map((horse) => ({
          ...horse,
          position: 0,
        }))
      );
      setRaceStarted(true);
      setRaceFinished(false);
    }
  };

  const resetRace = () => {
    setSelectedHorse(null);
    setWinner(null);
    setHorses((prevHorses: Horse[]) =>
      prevHorses.map((horse) => ({
        ...horse,
        position: 0,
      }))
    );
    setRaceStarted(false);
    setRaceFinished(false);
  };

  return (
    <View style={styles.raceContainer}>
      <View style={styles.betting}>
        {raceStarted ? (
          <Text>Race is in progress...</Text>
        ) : (
          <>
            <Text style={styles.betTitle}>Place your bet:</Text>
            {horses.map((horse: Horse) => (
              <Button
                key={horse.id}
                title={`Horse ${horse.id + 1}`}
                color={selectedHorse === horse.id ? '#28a745' : '#007bff'}
                disabled={selectedHorse !== null || raceStarted}
                onPress={() => handleBet(horse.id)}
              />
            ))}
            <Button
              title="Start Race"
              color={selectedHorse === null || raceFinished ? '#ccc' : '#007bff'}
              onPress={startRace}
              disabled={selectedHorse === null || raceFinished}
            />
          </>
        )}
        {raceStarted || raceFinished ? (
          <Button title="Reset Race" onPress={resetRace} />
        ) : null}
      </View>
      <View style={styles.raceTrack}>
        {horses.map((horse: Horse) => (
          <View
            key={horse.id}
            style={[
              styles.horse,
              { left: horse.position + '%' },
              winner === horse.id ? styles.winnerHorse : null,
            ]}
          >
            <FontAwesomeIcon
              icon={
                horse.id === 0
                  ? faHorse
                  : horse.id === 1
                  ? faDog
                  : horse.id === 2
                  ? faCat
                  : horse.id === 3
                  ? faFish
                  : faCocktail
              }
              size={20}
              color="white"
            />
          </View>
        ))}
        <View style={[styles.finishLine, { left: '90%' }]} />
      </View>
      {winner !== null && selectedHorse === winner && (
        <Text style={styles.winMessage}>Congratulations! You've won!</Text>
      )}
      {winner !== null && selectedHorse !== winner && (
        <Text style={styles.loseMessage}>Better luck next time!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  raceContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  betting: {
    marginBottom: 20,
  },
  betTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  raceTrack: {
    position: 'relative',
    width: '100%',
    height: 200,
    borderWidth: 2,
    borderColor: '#333',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horse: {
    position: 'absolute',
    width: 30,
    height: 30,
    backgroundColor: '#b21365a7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    transitionProperty: 'left',
    transitionDuration: '0.1s',
  },
  winnerHorse: {
    backgroundColor: '#28a745',
  },
  finishLine: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 2,
    height: '100%',
    backgroundColor: 'black',
  },
  winMessage: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
  },
  loseMessage: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default HorseRace;



