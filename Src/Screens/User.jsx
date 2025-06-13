import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Card, IconButton, Button } from 'react-native-paper';
import SettingService from '../setting/SettingService';

export default function User() {
  const [usuarios, setUsuarios] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]); // controla os ids expandidos

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    const lista = await SettingService.listar();
    setUsuarios(lista);
  }

  async function excluirUsuario(id) {
    await SettingService.remover(id);
    carregarUsuarios(); // Atualiza a lista após exclusão
  }

  // Função para alternar expandido/recolhido
  function toggleExpand(id) {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter(itemId => itemId !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  }

  const renderItem = ({ item }) => {
    const isExpanded = expandedIds.includes(item.id);
    return (
      <Card style={styles.card}>
        <Card.Title
          title={item.nome}
          right={() => (
            <IconButton
              icon="delete"
              iconColor="#b00020"
              size={24}
              onPress={() => excluirUsuario(item.id)}
            />
          )}
        />
        <Card.Content>
          <Button 
            mode="outlined" 
            onPress={() => toggleExpand(item.id)}
            style={{ marginBottom: 10 }}
          >
            {isExpanded ? 'Recolher' : 'Expandir'}
          </Button>
          {isExpanded && (
            <View>
              <Text><Text style={styles.label}>ID:</Text> {item.id}</Text>
              <Text><Text style={styles.label}>Email:</Text> {item.email}</Text>
            </View>
          )}
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
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
    backgroundColor: '#000',
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  semUsuarios: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 30,
    color: 'white',
  },
  card: {
    marginBottom: 10,
    padding: 10,
  },
  label: {
    fontWeight: 'bold',
  },
});
