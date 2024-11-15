import React, { useState, useEffect } from "react";
import { Autocomplete as RAutocomplete, TextField } from "@mui/material";
import styled from "styled-components";

const StyledAutoComplete = styled(RAutocomplete)`
  * {
    border: none;
  }
  label {
    display: none;
  }
  &.MuiAutocomplete-root {
    margin-top: 8px;
  }
  .MuiOutlinedInput-root {
    flex-wrap: wrap;
    padding: 0px !important;
    gap: 4px;
  }
  input {
    min-width: 180px;
    flex: 1;
    border: 1px solid lightgray;
    border-radius: 12px;
    height: 32px;
  }
  &.Mui-focused .MuiTextField-root * {
    //border-bottom: ${({ theme }) => `1px solid ${theme.color2}`};
    border: none;
    input {
      border: 2px solid black;
      border-radius: 12px;
      height: 32px;
    }
  }
`;

const Autocomplete = ({ items, value, onChange }) => {
  const [currentValue, setCurrentValue] = useState(null);
  const [currentInputValue, setCurrentInputValue] = useState("");
  const [previousValue, setPreviousValue] = useState(null);

  useEffect(() => {
    onChange(currentInputValue);
  }, [currentInputValue]);

  useEffect(() => {
    if (value !== previousValue) {
      setCurrentInputValue(value);
      setCurrentValue(value);
      setPreviousValue(value);
    }
  }, [value]);

  return (
    <StyledAutoComplete
      disablePortal
      id="category"
      options={[
        ...new Set(
          [currentInputValue && currentInputValue, ...items].filter(Boolean)
        ),
      ]}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="label" />}
      value={currentValue}
      inputValue={currentInputValue}
      onChange={(e, newValue) => setCurrentValue(newValue)}
      onInputChange={(e, newInputValue) => setCurrentInputValue(newInputValue)}
      style={{ width: "100%" }}
    />
  );
};

export default Autocomplete;
