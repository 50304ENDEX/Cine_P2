import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Card, Provider as PaperProvider, Button, Text, TextInput } from 'react-native-paper';
import * as yup from 'yup';

import SettingService from '../setting/SettingService'; 

const schema = yup.object().shape({
  nomeUsuario: yup.string().required('Nome de usuário é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  senha: yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
  dataNascimento: yup
    .string()
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/,
      'Data de nascimento deve estar no formato DD/MM/AAAA'
    )
    .required('Data de nascimento é obrigatória'),
});

export default function Login({ navigation, route }) {
  const usuarioAntigo = route.params || {};

  const [nomeUsuario, setNomeUsuario] = useState(usuarioAntigo.nome || "");
  const [email, setEmail] = useState(usuarioAntigo.email || "");
  const [senha, setSenha] = useState(usuarioAntigo.senha || "");
  const [dataNascimento, setDataNascimento] = useState(usuarioAntigo.dataNascimento || "");

  const [errors, setErrors] = useState({});

  async function salvar() {
    try {
      setErrors({});

      await schema.validate(
        { nomeUsuario, email, senha, dataNascimento },
        { abortEarly: false }
      );

      const usuario = {
        nome: nomeUsuario,
        email: email,
        senha: senha,
        dataNascimento: dataNascimento,
      };

      await SettingService.salvar(usuario);

      console.log('Usuário salvo:', usuario);

      navigation.reset({
        index: 0,
        routes: [{ name: 'pagina acesso' }],
      });

    } catch (err) {
      if (err.inner) {
        const errorObj = {};
        err.inner.forEach(e => {
          if (!errorObj[e.path]) {
            errorObj[e.path] = e.message;
          }
        });
        setErrors(errorObj);
      } else {
        alert(err.message);
      }
    }
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
              style={{ marginBottom: 2 }}
              placeholder="Digite seu nome"
              error={!!errors.nomeUsuario}
            />
            {errors.nomeUsuario && <Text style={styles.errorText}>{errors.nomeUsuario}</Text>}

            <TextInput
              label="Email"
              mode="outlined"
              value={email}
              onChangeText={setEmail}
              style={{ marginBottom: 2 }}
              placeholder="Digite seu email"
              keyboardType="email-address"
              autoCapitalize="none"
              error={!!errors.email}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
              label="Senha"
              mode="outlined"
              secureTextEntry={true}
              value={senha}
              onChangeText={setSenha}
              placeholder="Digite sua senha"
              style={{ marginBottom: 2 }}
              error={!!errors.senha}
            />
            {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}

            <Text style={{ marginBottom: 5 }}>Data de Nascimento</Text>
            <TextInputMask
              type={'datetime'}
              options={{ format: 'DD/MM/YYYY' }}
              value={dataNascimento}
              onChangeText={setDataNascimento}
              placeholder="DD/MM/AAAA"
              style={[styles.maskedInput, errors.dataNascimento && styles.inputError]}
              customTextInput={TextInput}
              customTextInputProps={{ mode: 'outlined', error: !!errors.dataNascimento }}
            />
            {errors.dataNascimento && <Text style={styles.errorText}>{errors.dataNascimento}</Text>}

            <Button
              mode="contained"
              style={[styles.button, { marginTop: 20 }]}
              onPress={salvar}
            >
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
  inputError: {
    borderColor: 'red',
  },
  button: {
    backgroundColor: 'gray',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
});
