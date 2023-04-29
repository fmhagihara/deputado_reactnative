import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, FlatList } from 'react-native';

function Gastos({ route, navigation }) {
    const { idDeputado } = route.params;
    const [gastos, setGastos] = useState([]);

    const anoAtual = new Date().getFullYear();
    const meses = [
        null, // Para que o índice comece em 1, já que janeiro é o mês 1
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${idDeputado}/despesas?ano=${anoAtual}`, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                    },
                });
                const data = await response.json();
                //console.log(data.dados);

                // Adiciona o valor gasto de acordo com cada mês
                const totais = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (let i = 0; i < data.dados.length; i++) {
                    const mes = data.dados[i].mes;
                    totais[mes] += data.dados[i].valorLiquido;
                }

                // Se valor estiver zerado, não mostra
                const mostrar = [];
                totais.forEach((valor, mes) => {
                    if (valor > 0) {
                        const formatado = valor.toFixed(2);
                        const m = { id: mes, nomeMes: meses[mes], totalGasto: formatado }
                        mostrar.push(m);
                    }
                });
                setGastos(mostrar);
                //console.log(mostrar);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [idDeputado]);


    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.nomeMes}>{item.nomeMes}</Text>
            <Text style={styles.valorGasto}>{item.totalGasto}</Text>
        </View>
    );


    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.heading}>Gastos em {anoAtual} por mês</Text>
                {gastos ? (
                    <>
                        <FlatList
                            data={gastos}
                            keyExtractor={item => item.id.toString()}
                            renderItem={renderItem}
                            style={styles.tabela}
                        />
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
    tabela: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        margin: 10,
    },
    item: {
        flexDirection: 'row',
        padding: 10,
    },
    nomeMes: {
        width: 150,
        fontWeight: 'bold',
    },
    valorGasto: {
        width: 150,
        textAlign: 'right',
    },
});


export default Gastos;