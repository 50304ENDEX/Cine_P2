import AsyncStorage from '@react-native-async-storage/async-storage';

async function listar() {
    const JsonValue = await AsyncStorage.getItem('usuarios');
    return JsonValue != null ? JSON.parse(usuarios) : [];
}

async function salvar(usuario){
    usuaio.id = new Date().getTime();
    const usuarios = await listar()
    usuarios.push(usuario);
    await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
}


export default {
    listar,
    salvar
}

