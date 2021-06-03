import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Text from "../../components/Text/Text.js";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    margin: "auto",
    width: "80%",
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#2A324B",
    fontSize: "1.5em",
  },
  image: {
    overflowY: "hidden",
    height: "500px",
  },
}));

export default function MyCafe() {

  let history = useHistory();
  const token = localStorage.getItem("token");

  if (token) {
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  }

  const classes = useStyles();

  const [values, setValues] = useState({
    reviews: "",
    raitings: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [cafes, setCafes] = useState([]);

  async function fetchCafesFromServer() {
    const result = await axios.get(`http://localhost:8050/cafes/${id}`);
    setCafes(result.data);
  }

  useEffect(() => {
    fetchCafesFromServer();
  }, []);

  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await AddReview(values);
      history.push("/filter");
    } catch (e) {
      setErrorMessage(e.response?.data.message || "Something went wrong");
    }
  };

  let pathArray = window.location.pathname.split("/");
  let id = pathArray[2];

  async function AddReview(newBest) {
    const { reviews, raitings } = values;
    await axios.post(`http://localhost:8050/reviews/${id}`, {
      reviews,
      raitings,
    });
  }

  return (
    <div>
      <div className={classes.image}>
        <img src={cafes.selectedFile} alt="cafe_picture" />
      </div>

      <div className={classes.paper}>
        <div className={classes.MainItems}>
          <Text
            head={cafes.name}
            par={cafes.description}
            head1={"Cafe Address: " + cafes.street_name}
          />
        </div>

        <div>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Add a Review
          </Typography>

          <form className={classes.form} onSubmit={handleFormSubmit}>
            <FormHelperText error={true}>{errorMessage || " "}</FormHelperText>

            <TextField
              name="reviews"
              label="Review"
              value={values.reviews}
              onChange={handleInputValue}
              required
              fullWidth
            />
            <TextField
              name="raitings"
              label="Rating"
              value={values.raitings}
              onChange={handleInputValue}
              required
              fullWidth
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add a Rating
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
