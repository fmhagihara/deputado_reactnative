
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';

function Proposicoes({ route, navigation }) {
  const { idDeputado } = route.params;
  const [proposicoes, setProposicoes] = useState([]);

  const anoAtual = new Date().getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/proposicoes?ano=${anoAtual}&idDeputadoAutor=${idDeputado}&itens=1000`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        });
        const data = await response.json();
        //console.log(data.dados.length + " proposicoes em "+anoAtual);
        setProposicoes(data.dados);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [idDeputado]);


  function inteiroTeor(idProposicao) {
    console.log(`Buscando inteiro teor "${idProposicao}"...`);
    const fetchData = async () => {
      try {
        const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/proposicoes/${idProposicao}`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        });
        const data = await response.json();
        //console.log("URL: " + data.dados.urlInteiroTeor);
        Linking.openURL(data.dados.urlInteiroTeor);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Clique na proposição para baixar o inteiro teor em PDF</Text>
        {proposicoes ? (
          <>
            <ScrollView>
              {proposicoes.map((proposicao) => (
                <TouchableOpacity key={proposicao.id} onPress={() => inteiroTeor(proposicao.id)}>
                  <Text style={styles.listaResultado} >{proposicao.numero} / {proposicao.ano} - {proposicao.ementa}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
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
  heading: {
    fontSize: 16,
    marginBottom: 10,
  },
  listaResultado: {
    textAlign: 'justify',
    fontSize: 14,
    width: 300,
    flexWrap: 'wrap',
  }
});


export default Proposicoes;