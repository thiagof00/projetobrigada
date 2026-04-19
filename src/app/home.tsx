import LogoutImage from "@/assets/logout.svg";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
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
import { useSocket } from "./hooks/socket";
import { getLocation, UserLocation } from "./services/location";
import { ButtonSoS, Container, FooterHome, LeftSideButtons, RightSideButtons, TextButtonSoS } from "./styles/home";

export default function Home() {
  //valor fixo até a implementação de login
  const usuarioId = "8b4238bc-1896-43e4-a1b4-7acfa3cadfd4"
  const { status, brigadista, erro, criarOcorrencia, setStatus, isConnected } = useSocket(usuarioId)

  const [location, setLocation] = useState<UserLocation | null>(null)
  const [contador, setContador] = useState(15)

  const timerRef = useRef<number | null>(null)
  const intervalRef = useRef<number | null>(null)


  //useEffect para uso da localização do dispositivo
  useEffect(() => {
    (async () => {
      const loc = await getLocation()
      setLocation(loc)
    })()
  }, [])

  // Exibe erro do socket como alerta
  useEffect(() => {
    if (erro) alert(erro)
  }, [erro])

  const clearAllTimers = () => {
    if (timerRef.current !== null) { clearTimeout(timerRef.current); timerRef.current = null }
    if (intervalRef.current !== null) { clearInterval(intervalRef.current); intervalRef.current = null }
  }

  const openConfirmModal = () => {
    setStatus('confirmando')
    setContador(15)

    timerRef.current = setTimeout(() => handleConfirmSOS(), 15000) as unknown as number
    intervalRef.current = setInterval(() => {
      setContador(prev => (prev <= 1 ? 0 : prev - 1))
    }, 1000) as unknown as number
  }

  // função para troca do status para enviado e criação da ocorrencia a partir do useSocket
  const handleConfirmSOS = async () => {
    clearAllTimers()
    setStatus('enviado')

    //valores fixos até a implementação
    await criarOcorrencia(-29.77148079593239, -57.09431976604669)
    // status vai para 'aguardando' dentro do hook após sucesso
  }

  //limpeza dos timers para acionamento automatico e troca do status para parado
  const handleCancel = () => {
    clearAllTimers()
    setStatus('parado')
  }

  //textos do botão de sos de acordo com cada status 
  const textoBotao = {
    parado: 'SOS',
    confirmando: 'SOS',
    enviado: 'SOS',
    aguardando: 'Aguardando\naceite...',
    aceito: 'Em\natendimento',
  }[status]

  return (
    <Body>
      <Container>

        <View style={{ width: "100%", position: "absolute", top: 0, height: 64, padding: 12, flexDirection: "row-reverse" }}>
          <TouchableOpacity onPress={() => router.push("/")}>
            <LogoutImage width={40} height={40} />
          </TouchableOpacity>
        </View>

        <ViewAnimatedButton colorBackground="#FFB3C6" outputRange={[1, 1.4]} />
        <ViewAnimatedButton colorBackground="#FF8FAB" outputRange={[1, 2]} />

        <ButtonSoS
          onPress={openConfirmModal}
          disabled={status === 'aguardando' || status === 'aceito'}
        >
          <TextButtonSoS>{textoBotao}</TextButtonSoS>
        </ButtonSoS>

        {status === 'aceito' && brigadista && (
          <View style={styles.brigadistaCard}>
            <Text style={styles.brigadistaTitulo}>🚨 Viatura a caminho!</Text>
            <Text style={styles.brigadistaTexto}>Brigadista: {brigadista.nome}</Text>

          </View>
        )}

        <Modal
          visible={status === 'confirmando'}
          transparent
          animationType="fade"
          onRequestClose={handleCancel}
        >
          <View style={styles.overlay}>
            <View style={styles.modalBox}>
              <Text style={styles.title}>Confirmação</Text>
              <Text style={styles.message}>Você deseja realmente acionar o SOS?</Text>
              <Text style={styles.contador}>Acionando automaticamente em: {contador}s</Text>
              <View style={styles.row}>
                <Pressable style={[styles.btn, styles.cancelBtn]} onPress={handleCancel}>
                  <Text style={styles.btnText}>Cancelar</Text>
                </Pressable>
                <Pressable style={[styles.btn, styles.confirmBtn]} onPress={handleConfirmSOS}>
                  <Text style={styles.btnText}>Confirmar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          visible={status === 'enviado'}
          transparent
          animationType="fade"
        >
          <View style={styles.overlay}>
            <View style={styles.modalBox}>
              <Text style={styles.title}>SOS Acionado!</Text>
              <Text style={styles.message}>Sua solicitação foi enviada.</Text>
            </View>
          </View>
        </Modal>
        {isConnected ? <Text>Conectado</Text> : <Text>Não conectado</Text>}

      </Container>

      <FooterHome>
        <LeftSideButtons onPress={() => Linking.openURL("tel:55984280556")}>
          <Text style={{ color: "#FFE5EC" }}>Fazer Ligação</Text>
        </LeftSideButtons>
        <RightSideButtons>
          <Text style={{ color: "#FFE5EC" }}>Localização</Text>
        </RightSideButtons>
      </FooterHome>
    </Body >
  )
}

const pink = "#ff4f7d"

const styles = StyleSheet.create({
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
  contador: {
    textAlign: "center",
    marginBottom: 16,
    color: "#888",
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
  cancelBtn: { backgroundColor: "#ccc" },
  confirmBtn: { backgroundColor: pink },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  brigadistaCard: {
    position: "absolute",
    bottom: 80,
    width: "85%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    elevation: 8,
    alignItems: "center",
    gap: 6,
  },
  brigadistaTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: pink,
    marginBottom: 8,
  },
  brigadistaTexto: {
    fontSize: 15,
    color: "#333",
  },
  cancelarBtn: {
    marginTop: 12,
    backgroundColor: "#ccc",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelarBtnText: {
    color: "#555",
    fontWeight: "bold",
  },
})