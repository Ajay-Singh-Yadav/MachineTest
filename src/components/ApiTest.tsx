import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { getImages } from '../services/api';

const ApiTest: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const testApi = async () => {
    setLoading(true);
    setResult('Testing API...');
    
    try {
      console.log('Starting API test...');
      const response = await getImages(0);
      console.log('API test response:', response);
      
      const resultText = `
Success! 
Images received: ${response.images.length}
First image: ${response.images[0]?.xt_image || 'No images'}
Total: ${response.total}
      `;
      setResult(resultText);
      Alert.alert('API Test Success', `Received ${response.images.length} images`);
    } catch (error) {
      console.error('API test error:', error);
      const errorText = `
Error: ${error instanceof Error ? error.message : 'Unknown error'}
      `;
      setResult(errorText);
      Alert.alert('API Test Failed', error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Test Component</Text>
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={testApi}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Testing...' : 'Test API'}
        </Text>
      </TouchableOpacity>
      
      <ScrollView style={styles.resultContainer}>
        <Text style={styles.resultText}>{result}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
  },
  resultText: {
    fontSize: 14,
    fontFamily: 'monospace',
  },
});

export default ApiTest;