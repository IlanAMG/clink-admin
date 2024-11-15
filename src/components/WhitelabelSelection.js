import { Autocomplete, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { whitelabelListSelector } from "../store/Whitelabel/WhitelabelList";
import { LabelInput } from "./ModalWhiteLabel/ModalWhiteLabelStyle";

const StyledAutocomplete = styled(Autocomplete)`
  width: 100%;
  min-width: 200px;
  label {
    opacity: 0;
  }
  * {
    border: none;
    outline: none;
  }
  .MuiInputBase-root {
    border: 1px solid rgb(172, 176, 183);
    border-radius: 12px;
    padding: 4px;
  }
  .Mui-focused {
    border: 2px solid black;
  }
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  max-width: 370px;
`;

export const WhitelabelSelection = ({
  value,
  onChange,
  disableAll = true,
  multiple = false,
}) => {
  const { whiteLabelNameList } = useSelector(whitelabelListSelector);

  return (
    <LabelInput>
      Whitelabel
      <StyledAutocomplete
        multiple={multiple}
        disablePortal
        id="whitelabel-selection"
        value={value}
        onChange={(e, newValue) => onChange(newValue)}
        options={
          disableAll
            ? whiteLabelNameList.filter((wln) => wln !== "All whitelabels")
            : whiteLabelNameList
        }
        sx={{ width: 300 }}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            label="Whitelabels"
            classes="test"
            InputLabelProps={{ variant: "standard", shrink: false }}
          />
        )}
      />
    </LabelInput>
  );
};
