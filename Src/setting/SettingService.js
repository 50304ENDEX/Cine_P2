import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'usuarios';

async function listar() {
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
  return jsonValue != null ? JSON.parse(jsonValue) : [];
}

async function salvar(usuario) {
  usuario.id = usuario.id || new Date().getTime(); // Usa UUID se já estiver definido, senão gera com timestamp
  const usuarios = await listar();
  usuarios.push(usuario);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
}

async function remover(id) {
  const lista = await listar();
  const novaLista = lista.filter(usuario => usuario.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
}

export default {
  listar,
  salvar,
  remover
};
