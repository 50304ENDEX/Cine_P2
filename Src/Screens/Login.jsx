import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Card, PaperProvider, Button, Text, TextInput } from 'react-native-paper';

export default function Login({ navigation, route }) {
  const usuarioAntigo = route.params || {};

  const [nomeUsuario, setNomeUsuario] = useState(usuarioAntigo.nome || "");
  const [email, setEmail] = useState(usuarioAntigo.email || "");
  const [senha, setSenha] = useState(usuarioAntigo.senha || "");
  const [dataNascimento, setDataNascimento] = useState(usuarioAntigo.dataNascimento || "");

  async function salvar() {
    if (!nomeUsuario || !email || !senha || !dataNascimento) {
      alert("Preencha todos os campos.");
      return;
    }

    const usuario = {
      nome: nomeUsuario,
      email: email,
      senha: senha,
      dataNascimento: dataNascimento,
    };

    console.log('Usuário salvo:', usuario);

    // 🔒 Resetando a pilha de navegação
    navigation.reset({
      index: 0,
      routes: [{ name: 'pagina acesso' }],
    });
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Title
            title="Login"
            titleStyle={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}
          />
          <Card.Content>
            <Text style={styles.text}>Login</Text>

            <TextInput
              label="Nome de Usuário"
              mode="outlined"
              value={nomeUsuario}
              onChangeText={setNomeUsuario}
              style={{ marginBottom: 10 }}
              placeholder="Digite seu nome"
            />

            <TextInput
              label="Email"
              mode="outlined"
              value={email}
              onChangeText={setEmail}
              style={{ marginBottom: 10 }}
              placeholder="Digite seu email"
            />

            <TextInput
              label="Senha"
              mode="outlined"
              secureTextEntry={true}
              value={senha}
              onChangeText={setSenha}
              placeholder="Digite sua senha"
              style={{ marginBottom: 10 }}
            />

            <Text style={{ marginBottom: 5 }}>Data de Nascimento</Text>
            <TextInputMask
              type={'datetime'}
              options={{ format: 'DD/MM/YYYY' }}
              value={dataNascimento}
              onChangeText={setDataNascimento}
              placeholder="DD/MM/AAAA"
              style={styles.maskedInput}
              customTextInput={TextInput}
              customTextInputProps={{ mode: 'outlined' }}
            />

            <Button mode="contained" style={{ marginTop: 20 }} onPress={salvar}>
              Entrar
            </Button>
          </Card.Content>
        </Card>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    margin: 10,
    backgroundColor: 'white',
    width: '90%',
  },
  maskedInput: {
    marginBottom: 10,
  },
});
