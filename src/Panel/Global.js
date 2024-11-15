import styled from "styled-components";

export const Global = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 70px);
  padding: 24px;

  span {
    font-size: 40px;
    font-weight: bold;
    display: flex;
    align-items: center;
    border-bottom: 0.5px solid rgba(180, 180, 180, 0.5);
  }
  small {
    font-size: 18px;
    font-weight: normal;
    width: 100%;
    margin-right: 12px;
  }
`;