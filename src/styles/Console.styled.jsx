import styled from 'styled-components';

export const Console = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`

export const Board = styled.section`
  width: ${(props) => props.boardSize}px;
  background-color: #2d2d2d;
`

export const Row = styled.div`
  display: flex;
  z-index: 99;
`
