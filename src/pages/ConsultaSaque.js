import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { Card, Title, Paragraph } from 'react-native-paper';

function ConsultaSaque () {
    const [exibirResultado, setExibirResultado] = useState(false);
    const [valorRetirado, setValorRetirado] = useState(0);
    const [dolarAtual, setDolarAtual] = useState(0);
    const [resultado, setResultado] = useState(null);
    const [investidores, setInvestidores] = useState([
        {
            id: 0,
            nome: 'Walter',
            investimento: 3052
        },
        {
            id: 1,
            nome: 'Marcela',
            investimento: 2500
        },
        {
            id: 2,
            nome: 'Marli',
            investimento: 500
        }
    ]);

    const calcularSaque = () => {
        setExibirResultado(false);
        setResultado(null);
        var resultadoConsulta = retirada(investidores, getTotalInvestido(investidores), valorRetirado, dolarAtual);
        setResultado([...resultadoConsulta]);
        setExibirResultado(true);
    }

    const getTotalInvestido = (investidores) => {
        let total = 0;
        investidores.map((e) => {
            total = total + e.investimento;
        });
        return total + 400;
    };

    const retirada = (
        investidores,
        dinheiro_total,
        dinheiro_a_ser_retirado,
        valor_dolar
      ) => {
        // fazendo a diferença do bot
        dinheiro_total = dinheiro_total - 400;
        let dinhero_rendido = dinheiro_a_ser_retirado;
        investidores.map((investidor, index) => {
          let porcentagem = (investidor.investimento * (100 / dinheiro_total)) / 100;
          investidor.index = index;
          investidor.porcentagem = (porcentagem * 100).toFixed(2) + '%';
      
          let dinheiro_a_ser_retirado = porcentagem * dinhero_rendido;
          investidor.dinheiro_a_ser_retirado_dolares =
            "$" + dinheiro_a_ser_retirado.toFixed(2);
          investidor.valor_em_real =
            "R$" + (dinheiro_a_ser_retirado * valor_dolar).toFixed(2);
        });
      
        return investidores;
      };

    const changeValueInvestidores = (index, value) => {
        var investidoresCopy = investidores;
        investidoresCopy[index].investimento = value;
        setInvestidores([...investidoresCopy]);
    }

    return (
        <View>
            <View>
                <Text style={{ padding: 10 }}>Investidores: </Text>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    {investidores.map((investidor, index) => (
                        <View style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: 3}} key={investidor.id}>
                            <Text>{investidor.nome}</Text>
                            <NumericInput totalWidth={120} valueType='real' value={investidor.investimento} onChange={value => changeValueInvestidores(index, value)} />
                        </View>
                    ))}
                </View>
                <View>
                    <Text style={{ padding: 10 }}>Valores Atuais: </Text>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <View style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: 3}}>
                            <Text>Valor a ser Retirado</Text>
                            <NumericInput totalWidth={160} totalHeight={50} valueType='real' value={valorRetirado} onChange={value => setValorRetirado(value)} />
                        </View>
                        <View style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: 3}}>
                            <Text>Valor atual do Dolar</Text>
                            <NumericInput totalWidth={160} totalHeight={50} valueType='real' value={dolarAtual} onChange={value => setDolarAtual(value)} />
                        </View>
                    </View>
                </View>
                <View style={{ alignItems: 'center', paddingVertical: 15}}>
                    <Button 
                        onPress={() => calcularSaque()}
                        title="Calcular Resultado"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </View>
            <View>
                {exibirResultado && resultado.map((investidor) => (
                    <Card key={investidor.index} style={{ marginHorizontal: 20, marginVertical: 5}}>
                        <Card.Content>
                            <Title>{investidor.nome}</Title>
                            <Paragraph>Valor em Dolar: {investidor.dinheiro_a_ser_retirado_dolares}</Paragraph>
                            <Paragraph>Valor em Real: {investidor.valor_em_real}</Paragraph>
                            <Paragraph>Porcentagem da Banca: {investidor.porcentagem}</Paragraph>
                        </Card.Content>
                    </Card>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  
  

export default ConsultaSaque;