import styled from "styled-components";

const CheckBoxLabeled = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};
  color: #080808;
  width: ${({ width }) => (width ? width : "100%")};
  padding: ${({ padding }) => (padding ? padding : "12px 8px")};
  border-radius: 8px;
  margin-right: ${({ mr }) => mr && mr};
  &:hover {
    background: #dbdbdb1c;
  }
  cursor: pointer;
  input {
    position: relative;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    margin-left: ${({ ml }) => (ml ? ml : "10px")};
    border: 1px solid #d1d1d1;
    border-radius: 4px;
    transition: 500ms;
    cursor: pointer;
    &:hover:not(:disabled) {
      border-color: #5fd4d089;
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

export function CheckBox({ title, id, ...props }) {
  return (
    <CheckBoxLabeled
      mr={props.mr}
      ml={props.ml}
      padding={props.padding}
      reverse={props.reverse}
      width={props.width}
      htmlFor={id}
    >
      <span>{title}</span>
      <input id={id} type="checkbox" {...props} />
    </CheckBoxLabeled>
  );
}
