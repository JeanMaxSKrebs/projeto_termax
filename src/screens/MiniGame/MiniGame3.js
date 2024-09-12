import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const generateProblem = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return { num1, num2, result: num1 + num2 };
};

const MiniGame3 = ({ onComplete }) => {
  const [problem, setProblem] = useState(generateProblem());
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = () => {
    if (parseInt(answer) === problem.result) {
      setFeedback('Correto!');
      if (onComplete) onComplete();
    } else {
      setFeedback('Errado. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.problemText}>
        Quanto é {problem.num1} + {problem.num2}?
      </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={answer}
        onChangeText={setAnswer}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Responder</Text>
      </TouchableOpacity>
      {feedback && <Text style={styles.feedback}>{feedback}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  problemText: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  feedback: {
    marginTop: 20,
    fontSize: 18,
    color: 'green',
  },
});

export default MiniGame3;
