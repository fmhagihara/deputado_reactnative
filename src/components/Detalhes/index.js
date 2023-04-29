
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

function Detalhes({ route, navigation }) {
  const { idDeputado } = route.params;
  const [deputado, setDeputado] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${idDeputado}`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        });
        const data = await response.json();
        //console.log("Deputado: " +idDeputado);
      
        setDeputado(data.dados.ultimoStatus);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [idDeputado]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {deputado ? (
          <>
            <Image style={styles.foto} src={deputado.urlFoto} />
            <View>
              <Text style={styles.dados}>Nome: {deputado.nome}</Text>
              <Text style={styles.dados}>UF: {deputado.siglaUf}</Text>
              <Text style={styles.dados}>E-mail: {deputado.email}</Text>
              <Text style={styles.dados}>Partido: {deputado.siglaPartido}</Text>
              <Text style={styles.dados}>Situação: {deputado.situacao}</Text>
              
              <View style={styles.botoes}>
                <Button title="Gastos" onPress={() => navigation.navigate('Gastos', { idDeputado: deputado.id})} />
                <Button title="Proposições" onPress={() => navigation.navigate('Proposicoes', { idDeputado: deputado.id})} />
              </View>
            </View>
          </>
        ) : (
          <Text>Carregando...</Text>
        )}
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
  foto: {
    margin: 12,
    width: 300,
    height: 400,

  },
  dados: {
    textAlign: 'left',
    fontSize: 16,
  },
  botoes: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default Detalhes;