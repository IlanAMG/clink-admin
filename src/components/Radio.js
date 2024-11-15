import React from "react";
import styled  from "styled-components";
const Label = styled.label`
    display: flex;
    align-items: center;
    flex-direction: ${({reverse}) => reverse ? "row-reverse" : ""};
    span{
        margin-left:8px;
    }
`


const Radio = ({ title, type, value, checked, id , ...props}) => {
  return (
    <>
      <Label for={id}>
        <input {...props} id={id} type={type} value={value} checked={checked} />
        <span> {title} </span>
      </Label>
    </>
  );
};
export default Radio;
