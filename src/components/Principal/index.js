
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

function Principal ({navigation})  {
  const [nomeBusca, setNomeBusca] = useState('');
  const [ufBusca, setUfBusca] = useState('');
  const [resultado, setResultado] = useState([]);

  const buscarNome = async() => {
    console.log(`Buscando nome "${nomeBusca}"...`);
    try {
      const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados?nome=${nomeBusca}&dataInicio=2023-01-01&ordem=ASC&ordenarPor=nome`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });
      const data = await response.json();
      setResultado(data.dados);
    } catch (error) {
      console.error(error);
    }
    
  };

  const buscarUF = async() => {
    console.log(`Buscando UF "${ufBusca}"...`);
    try {
      const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados?siglaUf=${ufBusca}&dataInicio=2023-01-01&ordem=ASC&ordenarPor=nome`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });
      const data = await response.json();
      setResultado(data.dados);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Procure seu deputado por nome ou UF</Text>
        <View style={styles.linhabusca}>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite parte do nome"
            value={nomeBusca}
            onChangeText={setNomeBusca}
          />
          <Button title="Buscar" onPress={()=>{buscarNome(); setUfBusca('');}} />
        </View>
        <View style={styles.linhabusca}>
          <Text style={styles.label}>UF:</Text>
          <Picker
            style={styles.select}
            selectedValue={ufBusca}
            onValueChange={(itemValue) => setUfBusca(itemValue)}>
            <Picker.Item label="Selecione UF" value="" />
            <Picker.Item label="Acre" value="AC" />
            <Picker.Item label="Alagoas" value="AL" />
            <Picker.Item label="Amapá" value="AP" />
            <Picker.Item label="Amazonas" value="AM" />
            <Picker.Item label="Bahia" value="BA" />
            <Picker.Item label="Ceará" value="CE" />
            <Picker.Item label="Distrito Federal" value="DF" />
            <Picker.Item label="Espírito Santo" value="ES" />
            <Picker.Item label="Goiás" value="GO" />
            <Picker.Item label="Maranhão" value="MA" />
            <Picker.Item label="Mato Grosso" value="MT" />
            <Picker.Item label="Mato Grosso do Sul" value="MS" />
            <Picker.Item label="Minas Gerais" value="MG" />
            <Picker.Item label="Pará" value="PA" />
            <Picker.Item label="Paraíba" value="PB" />
            <Picker.Item label="Paraná" value="PR" />
            <Picker.Item label="Pernambuco" value="PE" />
            <Picker.Item label="Piauí" value="PI" />
            <Picker.Item label="Rio de Janeiro" value="RJ" />
            <Picker.Item label="Rio Grande do Norte" value="RN" />
            <Picker.Item label="Rio Grande do Sul" value="RS" />
            <Picker.Item label="Rondônia" value="RO" />
            <Picker.Item label="Roraima" value="RR" />
            <Picker.Item label="Santa Catarina" value="SC" />
            <Picker.Item label="São Paulo" value="SP" />
            <Picker.Item label="Sergipe" value="SE" />
            <Picker.Item label="Tocantins" value="TO" />
          </Picker>
          <Button title="Buscar" onPress={()=>{buscarUF(); setNomeBusca('');}} />
        </View>
        <ScrollView>
        {resultado.map((dep) => (
          <TouchableOpacity key={dep.id} onPress={() => navigation.navigate('Detalhes', { idDeputado: dep.id})}>
            <Text style={styles.listaResultado} >{dep.nome} ({dep.siglaUf})</Text>
          </TouchableOpacity>
        ))}
        </ScrollView>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  linhabusca: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    marginRight: 8,
  },
  select: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 20,
    width: 250,
  },
  selectedValue: {
    marginTop: 8,
    fontSize: 16,
  },
  listaResultado: {
    textAlign: 'left',
    fontSize: 20,
    width: '100%',
  }
});

export default Principal;