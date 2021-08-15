import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import DatePicker from 'react-native-datepicker';
import NumericInput from 'react-native-numeric-input';
import { Card, Title, Paragraph } from 'react-native-paper';

function ConsultaInvestimentoFuturo (props) {

    const [dataInicial, setDataInicial] = useState(null);
    const [dataFinal, setDataFinal] = useState(null);
    const [valorInvestimento, setValorInvestimento] = useState(0);
    const [resultado, setResultado] = useState(null);
    const [exibirResultado, setExibirResultado] = useState(false);

    const reinvestimento = () => {

        const dataInicialArray = dataInicial.split("-");
        const dataInicialFormatada = new Date(dataInicialArray[1] + '/' + dataInicialArray[0] + '/' + dataInicialArray[2]);
        
        const dataFinalArray = dataFinal.split('-');
        const dataFinalFormatada = new Date(dataFinalArray[1] + '/' + dataFinalArray[0] + '/' + dataFinalArray[2]);

        const diffTime = Math.abs(dataFinalFormatada - dataInicialFormatada);
        const qtdDias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        var qtdDiasAcumulados = 0;
        var lucroDiario = 0;
        var valorInvestidoTotal = valorInvestimento;
        for(var i = qtdDias; i > 0; i--) {
            qtdDiasAcumulados++;
            lucroDiario += valorInvestidoTotal / 100;
            if(qtdDiasAcumulados == 7) {
                console.log('lucroDiario :>> ', lucroDiario);
                valorInvestidoTotal += lucroDiario;
                qtdDiasAcumulados = 0;
                lucroDiario = 0;
            }
        }

        setResultado({
            valorTotal: valorInvestidoTotal,
            dias: qtdDias
        });

        setExibirResultado(true);
    }
    return (
        <View style={{paddingTop: 20}}>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20}}>
                <View style={{display: 'flex', alignItems: 'center'}}>
                    <Text>Data Inicial</Text>
                    <DatePicker
                        style={{width: 150}}
                        date={dataInicial}
                        format="DD-MM-YYYY"
                        showIcon={false}
                        onDateChange={(e) => setDataInicial(e)}
                    />
                </View>
                <View style={{display: 'flex', alignItems: 'center'}}>
                    <Text>Dat Final</Text>
                    <DatePicker
                        style={{width: 150}}
                        date={dataFinal}
                        showIcon={false}
                        format="DD-MM-YYYY"
                        onDateChange={(e) => setDataFinal(e)}
                    />
                </View>
            </View>
            <View style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: 3}}>
                <Text>Valor Inicial do Investimento</Text>
                <NumericInput totalWidth={160} totalHeight={50} valueType='real' value={valorInvestimento} onChange={value => setValorInvestimento(value)} />
            </View>
            <View style={{ alignItems: 'center', paddingVertical: 15}}>
                <Button 
                    onPress={() => reinvestimento()}
                    title="Calcular"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
            <View>
                { exibirResultado &&
                    <Card style={{ marginHorizontal: 20, marginVertical: 5}}>
                        <Card.Content>
                            <Title>Resultado</Title>
                            <Paragraph>Reinvestindo todas as sextas, sua banca atual no dia {dataFinal} será de: </Paragraph>
                            <Paragraph style={{fontSize: 20, color: 'green'}}>${resultado.valorTotal.toFixed(2)}</Paragraph>
                        </Card.Content>
                    </Card>
                }
            </View>
        </View>
    )
}

export default ConsultaInvestimentoFuturo;