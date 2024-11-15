import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function InputSelect({textLabel, id, options , ...props}) {

    return (
        <div style={{display:"flex", alignItems:"center",justifyContent:"space-between",padding:"12px 8px",marginBottom:"0.5rem"}}>
            <span>{props.title}</span>
            <FormControl sx={{minWidth: 80 }}>
                <InputLabel id={id}>{textLabel}</InputLabel>
                <Select
                    labelId={id}
                    id="demo-simple-select-helper"
                    value={props.value}
                    label={props.title}
                    onChange={props.onChange}
                >
                    {options.map((option, i) =>
                        <MenuItem key={`${option}${i}`} value={option}>{option}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </div>
    );
}
