import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  background: transparent;
  word-break: break-all;
  .all-checkbox{
    margin-top: 32px;
    display:flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    height: 480px;
  }
  .bloc-onglets {
    display: flex;
    justify-content: space-evenly;
    cursor: pointer;
    .tabs {
      width: 50%;
      text-align: center;
      padding: 12px 0;
      border-radius: 8px;
      &:hover {
        background: rgba(25, 118, 210, 0.04);
      }
    }
    .active-tabs {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
      border-bottom: 1px solid #5FD4D0;
      color: #5FD4D0;
      font-weight: bold;
    }
  }
  .contenue-onglets {
    .contenu {
      display: none;
    }
    .active-contenu {
      display: contents;
    }
  }
`;
