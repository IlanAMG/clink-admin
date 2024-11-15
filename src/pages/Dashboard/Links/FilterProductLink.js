import { Autocomplete, TextField } from '@mui/material'
import React from 'react'

const options = [
    "Avec produit",
    "Sans produit"
]

export const FilterProductLink = ({ filterProductOnly, setFilterProductOnly }) => {
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            sx={{ width: 200 }}
            value={filterProductOnly}
            onChange={(_, value) => {
                setFilterProductOnly(value);
            }}
            renderInput={(params) => <TextField {...params} label="Tous les liens" />}
        />
    )
}
