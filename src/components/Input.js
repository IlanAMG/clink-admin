import styled from "styled-components";

const InputLabeled = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #080808;
  width: 100%;
  padding: 12px 8px;
  width: 100%;
  border-radius: 8px;

  input {
    position: relative;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    margin-left: 10px;
    border: 1px solid #d1d1d1;
    border-radius: 4px;
    transition: 500ms;
    outline: none;
    cursor: pointer;
    &:hover:not(:disabled) {
      border-color: #000;
    }
    &:focus {
      border: 2px solid #5fd4d0 !important;
    }
    &:before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      border-radius: 4px;
      padding: 2px;
    }
    &:checked:before {
      background: #5fd4d0 content-box;
    }
  }
`;

export function Input({ type = "number", title, id, ...props }) {
  return (
    <InputLabeled htmlFor={id}>
      {title}
      <input id={id} type={type} {...props} />
    </InputLabeled>
  );
}
