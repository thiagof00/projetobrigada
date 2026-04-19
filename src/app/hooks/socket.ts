import { useCallback, useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { api } from '../services/api'

type StatusType = 'parado' | 'confirmando' | 'enviado' | 'aguardando' | 'aceito'

enum TipoPerfil {
    BRIGADA = 'BRIGADA',
    CIVIL = 'CIVIL'
}

interface Usuario {
    nome: string
    cpf: string
    telefone: string
    email: string
    perfil: TipoPerfil
}

interface ResCreate {
    sucesso: boolean
    ocorrenciaId: string
    brigadistaNotificado: Usuario
}

interface Brigadista {
    nome: string
}

export function useSocket(usuarioId: string) {
    const socket = useRef<Socket | null>(null)
    const [status, setStatus] = useState<StatusType>('parado')
    const [isConnected, setIsConnected] = useState(false)
    const [brigadista, setBrigadista] = useState<Brigadista | null>(null)
    const [erro, setErro] = useState<string | null>(null)

    const url = process.env.EXPO_PUBLIC_BASE_URL_API

    useEffect(() => {
        if (!url) {
            console.error('❌ EXPO_PUBLIC_BASE_URL não definida!')
            return
        }

        console.log('🔌 Tentando conectar ao socket em:', url)

        // ✅ 2. Força websocket e configura reconexão
        socket.current = io(url, {
            transports: ['websocket'],
            reconnectionAttempts: 5,
            reconnectionDelay: 2000,
            timeout: 10000,
        })

        socket.current.on('connect', () => {
            console.log('✅ Socket conectado! ID:', socket.current?.id)
            setIsConnected(true)
            socket.current?.emit('entrar_cliente', { usuarioId })
        })

        socket.current.on('disconnect', (reason) => {
            console.log('🔴 Socket desconectado. Motivo:', reason)
            setIsConnected(false)
        })

        // ✅ 3. Captura erros de conexão
        socket.current.on('connect_error', (err) => {
            console.error('❌ Erro de conexão socket:', err.message)
            setErro('Falha na conexão com o servidor.')
        })


        // Brigadista aceitou a ocorrência
        socket.current.on('OCORRENCIA_EM_ANDAMENTO', (data: { brigadista: Brigadista }) => {
            setBrigadista(data.brigadista)
            setStatus('aceito')
            console.log("entrou: ", status)
            setErro(null)
        })

        // Ocorrência encerrada pelo brigadista
        socket.current.on('OCORRENCIA_FINALIZADA', () => {
            setStatus('parado')
            setBrigadista(null)
        })

        return () => {
            socket.current?.disconnect()
            socket.current = null
        }
    }, [url, usuarioId])

    const criarOcorrencia = useCallback(async (latitude: number, longitude: number) => {
        setErro(null)

        try {
            const res = await api.post<ResCreate>('/ocorrencias', {
                usuario_id: usuarioId,
                latitude,
                longitude,
            })

            if (res.data.sucesso) {
                setStatus('aguardando') // ← corrigido: vai para aguardando, não enviado
            } else {
                setStatus('parado')
                setErro('Não foi possível criar a ocorrência.')
            }
        } catch (err: any) {
            setStatus('parado')
            setErro(err?.response?.data?.message ?? 'Erro ao criar ocorrência.')
            console.error('criarOcorrencia:', err)
        }
    }, [usuarioId])

    return {
        status,
        brigadista,       // objeto completo em vez de só o nome
        isConnected,
        erro,
        criarOcorrencia,
        setStatus,
    }
}