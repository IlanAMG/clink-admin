import { useState } from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import styled from "styled-components";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  field: {
    borderBottom: "0.5px solid rgba(0, 0, 0, 0.3)",
  },
  noBorder: {
    border: "none",
  },
  textfield__label: {
    fontFamily: "sans-serif",
    fontStyle: "normal",
    fontWeight: "normal",
    lineHeight: "21px",
    color: "rgba(0, 0, 0, 0.7)",
  },
});

const AutocompleteStyle = styled(Autocomplete)`
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
  }
  &.Mui-focused .MuiTextField-root {
    border-bottom: ${({ theme }) => `0.5px solid ${theme.color2}`};
  }
`;

export default function InputAutocomplete({ onChange, placeholder, ...props }) {
  const [inputValue, setInputValue] = useState("");
  const classes = useStyles();

  const onDelete = (option) => {
    console.log("delete");
    onChange(props.value.filter((el) => el !== option));
  };

  const handleChange = (e, value) => {
    setInputValue(value.trim());
  };

  const formatValues = () => {
    if (inputValue.length < 3 || inputValue.length > 12)
      return toast.error("Minimum character 3 and maximum 12");
    if (props.value.includes(inputValue))
      return toast.error("Forbidden location repetition");

    onChange([...props.value, inputValue]);
    setInputValue("");
  };

  return (
    <>
      <AutocompleteStyle
        {...props}
        multiple
        options={[]}
        autoHighlight={false}
        freeSolo
        size="big"
        onKeyDown={(e) => {
          if (e.code === "Backspace" && props.value.length && !inputValue)
            return onDelete(props.value[props.value.length - 1]);
          if (e.code === "Space" || e.code === "Enter") {
            e.defaultMuiPrevented = true;
            if (!inputValue.length) return;
            return formatValues([...props.value, inputValue]);
          }
        }}
        inputValue={inputValue}
        onInputChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            className={classes.field}
            sx={{ pb: 1 }}
            variant="outlined"
            label={props.name}
            placeholder={placeholder}
            disableUnderline={false}
            classes={{ notchedOutline: classes.input }}
            InputProps={{
              className: classes.textfield__label,
              startAdornment: (props.value || []).map((option, index) => {
                return (
                  <Chip
                    key={index}
                    label={option}
                    size="big"
                    onDelete={() => onDelete(option)}
                  />
                );
              }),
              classes: { notchedOutline: classes.noBorder },
            }}
          />
        )}
        sx={{ mt: 4 }}
      />
    </>
  );
}
