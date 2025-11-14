import styled from "styled-components/native"

export const Container = styled.View`
    
    height: 40%;
    width: 70%;
    

    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color:#FFE5EC;

    border-radius: 32px;
    `
export const Body = styled.View`
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color:#FFF;


`
export const InputLogin = styled.TextInput`
    background-color: #FFC2D1;
    width: 200px;
    height: 32px;
    border-radius: 12px;
    padding: 8px;
    margin-bottom: 24px;


`
export const BottomText = styled.Text`

    position: absolute;
    bottom: 20%;
`