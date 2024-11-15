import styled from "styled-components";

export const ContainerAllEdition = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  height: 480px;
  .suprim-whitelabel {
    width: 240px;
    padding: 8px 12px;
    background: rgba(211, 210, 211, 0.8);
    transition: 0.5s;
    color: white;
    border: none;
    border-radius: 10px;
    margin: 8px 0px;
    &:hover {
      background: rgb(172, 176, 183);
    }
  }
`;
export const BtnSuprim = styled.button`
  width: 240px;
  padding: 8px 12px;
  background: rgba(211, 210, 211, 0.8);
  transition: 0.5s;
  color: white;
  border: none;
  border-radius: 10px;
  margin: 8px 0px;
  &:hover {
    background: rgb(172, 176, 183);
  }
`;

export const LabelInput = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  width: 100%;
  .description-product {
    resize: none;
    width: 100%;
    height: 140px;
    border-radius: 12px;
    border: 1px solid rgb(172, 176, 183);
    margin: 8px 0;
    padding: 8px;
  }
`;

export const Input = styled.input`
  height: 48px;
  border-radius: 12px;
  border: 1px solid rgb(172, 176, 183);
  margin: 8px 0;
  padding-left: 8px;
`;

export const Select = styled.select`
  height: 48px;
  border-radius: 12px;
  border: 1px solid rgb(172, 176, 183);
  margin: 8px 0;
  padding-left: 8px;
`;

export const ContainerInputColor = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 24px;
  .wrapper-collor-btn {
    display: flex;
    justify-content: space-between;
  }
  span {
    font-size: 10px;
    margin-bottom: 8px;
  }
  .view-color {
    width: 72px;
    height: 48px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 21px;
    cursor: pointer;
    small {
      color: white;
    }
  }
  .wrapper-chromePicker-toLeft {
    position: absolute;
    bottom: 72px;
    left: 0px;
    z-index: 200;
    touch-action: none;
  }
  .wrapper-chromePicker-center {
    position: absolute;
    bottom: 72px;
    left: 50%;
    z-index: 200;
    touch-action: none;
    transform: translateX(-50%);
  }

  .wrapper-chromePicker-toRight {
    position: absolute;
    bottom: 72px;
    right: 0px;
    z-index: 200;
    touch-action: none;
  }
`;
export const ContainerUploadLogo = styled.div`
  width: 100%;
  .wrapper-upload-logo {
    width: 100%;
    margin-bottom: 32px;
    display: flex;
    justify-content: space-between;
    .wrapper_img {
      height: 72px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgb(172, 176, 183);
      background: #dee0e652;
      border-radius: 8px;
      padding: 12px;
    }
    .wrapper-logobig {
      width: calc(50% - 24px);
      img {
        height: 100%;
      }
      span {
        font-size: 10px;
      }
    }
    .wrapper-logosmall {
      width: calc(50% - 24px);
      img {
        height: 100%;
      }
      span {
        font-size: 10px;
      }
    }
  }
`;

export const ButtonFile = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 35px;
  border: 1px solid rgb(172, 176, 183);
  border-radius: 12px;
  cursor: pointer;
  background: transparent;
  svg {
    margin-right: 12px;
  }
`;
export const ContainerBankDetail = styled.div`
  width: 420px;
  height: 480px;
  .content-detail {
    width: 100%;
    height: 140px;
    border-radius: 20px;
    margin-top: 30px;
    padding: 10px 10px;
    background: rgba(233, 233, 233, 0.8);
    h5 {
      margin-top: 0px;
      text-decoration: underline;
    }
    .details {
      margin-top: 0px;
      margin-bottom: 0px;
    }
    .bold-span {
      font-weight: bold;
      margin-right: 4px;
    }
  }
  h5 {
    font-weight: bold;
    font-size: 15px;
  }
  .container-table {
    margin-top: 10px;
  }
`;
