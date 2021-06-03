import React, { useState} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import axios from 'axios';
import FileBase from 'react-file-base64';
import Avatar from '@material-ui/core/Avatar';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: '40%',
    margin: 'auto'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#2A324B',
    fontSize: '1.5em'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  clear: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#2A324B',
    fontSize: '1.5em'
  },
  formControl: {
   margin: theme.spacing(1),
   minWidth: 120,
 },
}));

const Form = ({ currentId, setCurrentId }) => {
  const cuisineType = [
		"Dessert",
		 "Fresh, Ice Cream",
		 "Coffee and Tea",
		  "Burger & Sandwich",
			 "Pizza",
			 "BBQ, Kebab",
			  "Sushi",
				"Chicken Grill",
				"Khash",
				"Lahmajo",
				"Breakfast",
				"Lunch",
				"Dinner" ,
				"Asian"
			];

	const locationType = [
				"Ajapnyak",
				"Arabkir",
				"Avan",
				"Davtashen",
				"Erebuni",
				"Kanaker-Zeytun",
				"Kentron",
				"Malatia-Sebastia",
				"Nork-Marash",
				"Nor Nork",
				"Nubarashen",
				"Shengavit"
	];

	const activityType = [
				"Work & Study",
				"Friends Time",
				"Music and Concerts",
				"Hookah & Cigars",
				"Friday Night",
				"Wine & Cheese",
				"Beer House & Pub",
				"For Kids"
	];

  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });

  const [cuisine, setCuisine] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [activity, setActivity] = React.useState('');

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    street_name: "",
    district: "",
    description: ""
  });


  const handleInputValue = (e) => {
    const { name, value} = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const getUserToken = (values) => {
    const { name,
      email,
      password,
      street_name,
      district,
      description} = values;
    return axios.post("http://localhost:8050/cafes", {
    name,
    email,
    password,
    street_name,
    district,
    description,
    });
  };

  const classes = useStyles();
  const token = localStorage.getItem("token");

  const clear = () => {
    setCurrentId(0);
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  };

  if (token) {
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  }

  return (
    <Paper>
    <div className={classes.paper} >
    <Avatar className={classes.avatar}>
    <RestaurantIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      Register your restaurant
    </Typography>
      <form autoComplete="off" noValidate>
        <Typography variant="h6"></Typography>

          <TextField
            name="creator"
            variant="outlined"
            label="Restaurant name"
            onChange={handleInputValue}
            required
            fullWidth
          />

           <TextField
            name="email"
            label="Email"
            variant="outlined"
            onChange={handleInputValue}
            required
            fullWidth
           />

          <TextField
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            onChange={handleInputValue}
            required
            fullWidth
           />

         <TextField
            name="title"
            variant="outlined"
            label="Address"
            onChange={handleInputValue}
            required
            fullWidth
          />

          <TextField
            name="contact"
            variant="outlined"
            label="Contact number "
            onChange={handleInputValue}
            fullWidth
            required
          />

          <TextField
            name="Description"
            variant="outlined"
            label="Description"
            onChange={handleInputValue}
            fullWidth
            multiline rows={4}
          />

           <div>
        <FileBase
          type="file"
          multiple={false}
           />
           </div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          className={classes.submit}
          fullWidth>Submit</Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          className={classes.clear}
          fullWidth>
          Clear
        </Button>
      </form>
      </div>
    </Paper>
  );
};


export default Form;
