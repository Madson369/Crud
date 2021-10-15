import styled from "styled-components";

 const Modal = styled.div`
  background-color: #343a40;
  opacity: 0.3;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: ${(props) => (props.visible || props.visibleEdit ? "auto" : "0px")};
  transition: all 1000 ease;
`;

export default Modal