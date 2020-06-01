import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';


const useStyles = makeStyles((theme) => ({
  formControl: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    margin: theme.spacing(1),
    minWidth: 120,
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
        <InputLabel id="demo-simple-select-outlined-label" style={{color: "white"}} >Options</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={props.handleChange}
          label="Options"
          style={{color: "white"}}

        >
            <MenuItem value={"inventory"}>My Inventory</MenuItem>
            <MenuItem value={"wishlist"}>My Wishlist</MenuItem>
            <MenuItem value={"customs"}>My Custom Items</MenuItem>
            <MenuItem value={"pending"}>Pending Requests</MenuItem>
            <MenuItem value={"accepted"}>Accepted Requests</MenuItem>
            <MenuItem value={"edit"}>Edit Profile</MenuItem>
        </Select>
      </FormControl>
    
    </div>
  );
}