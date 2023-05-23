import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core'
import React from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export const Input = ({half, name,label, handleChange, autoFocus, type, handlePasswordShow}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
        name={name}
        label={label}
        onChange={handleChange}
        variant='outlined'
        required
        fullWidth
        autoFocus={autoFocus}
        type={type}
        InputProps={name === 'password' ? {
            endAdornment: (
                <InputAdornment position='end'>
                    <IconButton onClick={handlePasswordShow} >
                        { type === 'password' ? <Visibility /> : <VisibilityOff/> }
                    </IconButton>
                </InputAdornment>
            ),
        }:null}

        
        />
    </Grid>
  )
}
