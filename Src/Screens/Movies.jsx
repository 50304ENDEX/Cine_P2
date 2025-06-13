import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React, { useState, useCallback } from 'react';
import { Card, Title, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { API_KEY, BASE_URL, IMAGE_BASE_URL } from '../services/Api';

export default function Movies({ route }) {
  const genreId = route?.params?.genreId;
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState({});

  // Recarrega os filmes toda vez que a tela for focada
  useFocusEffect(
    useCallback(() => {
      async function fetchMovies() {
        try {
          const url = genreId
            ? `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
            : `${BASE_URL}/discover/movie?api_key=${API_KEY}`;

          const response = await fetch(url);
          const data = await response.json();
          setMovies(data.results || []);
          await loadFavorites();
        } catch (error) {
          console.error("Erro ao buscar filmes:", error);
        }
      }

      fetchMovies();
    }, [genreId])
  );

  const loadFavorites = async () => {
    const stored = await AsyncStorage.getItem('FAVORITE_MOVIES');
    const parsed = stored ? JSON.parse(stored) : [];
    const favoriteMap = {};
    parsed.forEach((fav) => {
      favoriteMap[fav.id] = true;
    });
    setFavorites(favoriteMap);
  };

  const toggleFavorite = useCallback(async (movie) => {
    try {
      const stored = await AsyncStorage.getItem('FAVORITE_MOVIES');
      const current = stored ? JSON.parse(stored) : [];

      let updated;
      let updatedFavorites = { ...favorites };

      const exists = current.find((m) => m.id === movie.id);

      if (exists) {
        updated = current.filter((m) => m.id !== movie.id);
        delete updatedFavorites[movie.id];
      } else {
        updated = [...current, movie];
        updatedFavorites[movie.id] = true;
      }

      await AsyncStorage.setItem('FAVORITE_MOVIES', JSON.stringify(updated));
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Erro ao salvar favorito:', error);
    }
  }, [favorites]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {genreId ? 'Filmes por Gênero' : 'Todos os Filmes'}
      </Text>
      <FlatList
        data={movies}
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
              <IconButton
                icon={favorites[item.id] ? 'bookmark' : 'bookmark-outline'}
                size={24}
                onPress={() => toggleFavorite(item)}
              />
            </View>
          </Card>
        )}
        extraData={favorites}
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
