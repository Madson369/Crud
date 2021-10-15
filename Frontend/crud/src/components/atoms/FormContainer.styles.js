import styled from "styled-components";

 const FormCont = styled.div`
  display: flex;
  position: absolute;
  background-color: white;
  border: 1px solid black;
  width: 300px;
  height: ${(props) => props.visible == true? '300px':'0px'};
  width: ${(props) => props.visible == true? '300px':'0px'};
  bottom: 15px;
  left: 350px;
  padding: ${(props) => props.visible == true? '1.5rem':'0px'};
  border: 1px solid #e7cbcb;
  border-radius: 18px;
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
  overflow: hidden;
  transition: all 1s cubic-bezier();
`;

export default FormCont