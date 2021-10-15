import styled from "styled-components";

 const Close = styled.button`
  text-align: center;
  padding: 0.75rem;
  cursor: pointer;
  background-color: transparent;
  border: none;
  width: 10px;
  height: 10px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 290px;

  &:hover {
    background-color: #e7cbcb;
  }
`;

export default Close