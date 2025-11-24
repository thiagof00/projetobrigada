import LogoutImage from "@/assets/logout.svg";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import ViewAnimatedButton from "./components/ViewAnimatedButton";
import { Body } from "./global";
import { ButtonSoS, Container, FooterHome, LeftSideButtons, RightSideButtons, TextButtonSoS } from "./styles/home";

export default function Home () {
  
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const [contador, setContador] = useState(15)
    
    const timerRef = useRef<number | null>(null);
    const intervalRef= useRef<number | null>(null)
    
   const openConfirmModal = () => {
    setConfirmVisible(true);
    setContador(15);

    // Timeout final: aciona SOS após 30s
    timerRef.current = setTimeout(() => {
      handleConfirmSOS(true);
    }, 15000) as unknown as number;

    // Intervalo para contagem regressiva
    intervalRef.current = setInterval(() => {
      setContador(prev => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000) as unknown as number;
  };


    const clearAllTimers = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

    const handleConfirmSOS = (auto = false) => {
    clearAllTimers();
    setConfirmVisible(false);

    setSuccessVisible(true);

    setTimeout(() => {
      setSuccessVisible(false);
    }, 2000);
  };

  const handleCancel = () => {
    clearAllTimers();
    setConfirmVisible(false);
  };

  const handleCall = () =>{
    Linking.openURL("tel:55984280556")
  }

    

  return (
    <Body>
      
      <Container>

      <View style={{width:"100%",position:"absolute",top:0, height:64,padding: 12, flexDirection:"row-reverse"}}>
      <TouchableOpacity onPress={()=> router.push("/")}>
        <LogoutImage width={40} height={40}/>
      </TouchableOpacity>
      </View>


      <ViewAnimatedButton colorBackground="#FFB3C6" outputRange={[1,1.4]}/>
      <ViewAnimatedButton colorBackground="#FF8FAB" outputRange={[1,2]}/>
      <ButtonSoS onPress={openConfirmModal}>
        <TextButtonSoS>SOS</TextButtonSoS>
      </ButtonSoS>


      {/* POP-UP 1: Confirmação */}
      <Modal
        visible={confirmVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={styles.title}>Confirmação</Text>
            <Text style={styles.message}>
              Você deseja realmente acionar o SOS?
            </Text>
            <Text >
              Acionando automaticamente em: {contador}s
            </Text>

            <View style={styles.row}>
              <Pressable
                style={[styles.btn, styles.cancelBtn]}
                onPress={handleCancel}
              >
                <Text style={styles.btnText}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={[styles.btn, styles.confirmBtn]}
                onPress={()=> handleConfirmSOS(false)}
              >
                <Text style={styles.btnText}>Confirmar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* POP-UP 2: SOS acionado */}
      <Modal
        visible={successVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSuccessVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={styles.title}>SOS Acionado!</Text>
            <Text style={styles.message}>Sua solicitação foi enviada.</Text>
          </View>
        </View>
      </Modal>

      </Container>

      <FooterHome>
      <LeftSideButtons>
        <Text style={{color:"#FFE5EC"}} onPress={handleCall}>Fazer Ligação (voltar)</Text>
      </LeftSideButtons>
      <RightSideButtons>
        <Text style={{color:"#FFE5EC"}}>Localização</Text>
      </RightSideButtons>
      </FooterHome>
    </Body>
  );
};

const pink = "#ff4f7d";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalBox: {
    width: 280,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  cancelBtn: {
    backgroundColor: "#ccc",
  },
  confirmBtn: {
    backgroundColor: pink,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
