import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import SettingService from '../setting/SettingService';

export default function User() {
  const [usuarios, setUsuarios] = useState([]);

  // Carrega os usuários ao montar o componente
  useEffect(() => {
    async function carregarUsuarios() {
      const lista = await SettingService.listar();
      setUsuarios(lista);
    }
    carregarUsuarios();
  }, []);

  // Renderizador de cada item da lista
  const renderItem = ({ item }) => (
    <View style={styles.usuarioContainer}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários cadastrados</Text>
      {usuarios.length === 0 ? (
        <Text style={styles.semUsuarios}>Nenhum usuário encontrado.</Text>
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  semUsuarios: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  usuarioContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  nome: {
    fontSize: 18,
    fontWeight: '600',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
});
