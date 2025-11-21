import { router } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text
} from "react-native";
import ViewAnimatedButton from "./components/ViewAnimatedButton";
import { Body } from "./global";
import { ButtonSoS, Container, FooterHome, SidesButtons, TextButtonSoS } from "./styles/home";

export default function Home () {
  
  return (
    <Body>
      
      <Container>

      <ViewAnimatedButton colorBackground="#FFB3C6" outputRange={[1,1.4]}/>
      <ViewAnimatedButton colorBackground="#FF8FAB" outputRange={[1,2]}/>
      <ButtonSoS onPress={()=>router.push("/")}>
        <TextButtonSoS>SOS</TextButtonSoS>
      </ButtonSoS>
     
      </Container>

      <FooterHome>
      <SidesButtons>
        <Text>Fazer Ligação</Text>
      </SidesButtons>
      <SidesButtons>
        <Text>Localização</Text>
      </SidesButtons>
      </FooterHome>
    </Body>
  );
};



const styles = StyleSheet.create({
  wrapper: {
    
  },

});
