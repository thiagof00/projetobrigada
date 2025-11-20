import { router } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight
} from "react-native";
import ViewAnimatedButton from "./components/ViewAnimatedButton";
import { Body } from "./global";
import { ButtonSoS, Container, FooterHome, TextButtonSoS } from "./styles/home";

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
      <TouchableHighlight>
        <Text style={{backgroundColor:"#FF8FAB", width: 120, height:48,color:"#FFF", textAlign:"center", alignItems:"center", marginRight: 24}}>Fazer Ligação</Text>
      </TouchableHighlight>
      <TouchableHighlight>
        <Text style={{backgroundColor:"#FF8FAB", width: 120, height:48,color:"#FFF", textAlign:"center", alignItems:"center", }}>Localização</Text>
      </TouchableHighlight>
      </FooterHome>
    </Body>
  );
};



const styles = StyleSheet.create({
  wrapper: {
    
  },

});
