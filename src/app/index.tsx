import { Link, useRouter } from 'expo-router';
import { Button } from 'react-native';
import { Body, BottomText, Container, InputLogin } from "./global";
    export default function Index(){
        
        const router = useRouter();

        return(
            <Body>
                <Container>

                    <InputLogin placeholder='CPF'placeholderTextColor="#767676"/>
                    <InputLogin placeholder='Senha'placeholderTextColor="#767676"/>
                    <Link href="/home">
                    <Button title='Login' color={"#767676"} onPress={()=>router.push("/home")}/>
                    </Link>                
                </Container>
                <BottomText>Uma colaboração IFFar e brigada militar 👮‍♀️</BottomText>

            </Body>
        )
    }
