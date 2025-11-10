import { Button, StyleSheet, Text, View } from 'react-native'
import { Body, Container, InputLogin } from "./global"
export default function Index(){
    return(
        <Body>
            <Container>

                <InputLogin placeholder='CPF'placeholderTextColor="#767676"/>
                <InputLogin placeholder='Senha'placeholderTextColor="#767676"/>
                <Button title='Login'/>

            <View>    
                <Text>Uma colaboração IFFar e brigada militar 👮‍♀️</Text>
            </View>
            </Container>

        </Body>
    )
}
const styles = StyleSheet.create({

    

    body:{alignItems: "center"},


})

