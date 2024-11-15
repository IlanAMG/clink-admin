import styled from "styled-components";

export const ContainerButton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 24px;

  button {
    width: 240px;
    padding: 8px 12px;
    background: rgba(211, 210, 211, 0.8);
    transition: 0.5s;
    color: white;
    border: none;
    border-radius: 10px;
    margin-top: 8px;
    display: flex;
    justify-content: flex-start;
    gap: 8px;
    &:hover {
      background: rgb(172, 176, 183);
    }
  }

  .primary {
    background: rgb(95, 212, 208);
    &:hover {
      background: rgb(61, 178, 180);
    }
  }

  .center {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;
