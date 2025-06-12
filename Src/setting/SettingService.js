import AsyncStorage from '@react-native-async-storage/async-storage';

async function listar() {
  const jsonValue = await AsyncStorage.getItem('usuarios');
  return jsonValue != null ? JSON.parse(jsonValue) : [];
}

async function salvar(usuario) {
  usuario.id = new Date().getTime(); // corrigido o nome da variável
  const usuarios = await listar();
  usuarios.push(usuario);
  await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
}

export default {
  listar,
  salvar,
};
