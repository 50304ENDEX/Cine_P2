import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Title } from 'react-native-paper';
import { IMAGE_BASE_URL } from '../services/Api';

export default function Listamovies() {
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    async function loadFavorites() {
      try {
        const stored = await AsyncStorage.getItem('FAVORITE_MOVIES');
        const parsed = stored ? JSON.parse(stored) : [];
        setSavedMovies(parsed);
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      }
    }

    const unsubscribe = loadFavorites();
    return () => unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filmes Salvos</Text>
      <FlatList
        data={savedMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              {item.poster_path && (
                <Image
                  source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
                  style={styles.poster}
                />
              )}
              <View style={styles.textContainer}>
                <Title style={styles.movieTitle}>{item.title}</Title>
                <Text style={styles.releaseYear}>
                  {item.release_date ? item.release_date.slice(0, 4) : 'Ano desconhecido'}
                </Text>
              </View>
            </View>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  card: {
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    elevation: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  poster: {
    width: 80,
    height: 120,
    marginRight: 10,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  releaseYear: {
    fontSize: 14,
    color: 'gray',
  },
});
