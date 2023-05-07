import styled from "styled-components";

export const Main = styled.main`
  padding: 3rem;
  margin-left: 30%;
  /* background-color: #2d2d2d; */
`

export const Input = styled.input`
  margin-bottom: 2rem;
  margin-left: 1rem;
  /* background-color: rgb(255, 218, 250); */
  width: 50px;
`

export const Console = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 3rem;
  /* flex-direction: column; */
`

export const Board = styled.section`
  width: ${(props) => props.boardSize}px;
  background-color: #2d2d2d;
`

export const Row = styled.div`
  display: flex;
  z-index: 99;
`

export const Button = styled.button`
  padding: 0.3rem;
  margin-bottom: 1rem;
  cursor: pointer;
  display: block;
`
