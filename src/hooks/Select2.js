import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderColor: "white",
    float: "right"

  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  // const [nav, setNav] = React.useState('');

  // const handleChange = (event) => {
  //   setNav(event.target.value);
  // };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Options</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={props.handleChange}
          label="Options"
        >
            <MenuItem value={"inventory"}>View Inventory</MenuItem>
            <MenuItem value={"wishlist"}>View Wishlist</MenuItem>
            <MenuItem value={"customs"}>View Custom Items</MenuItem>
        </Select>
      </FormControl>
    
    </div>
  );
}