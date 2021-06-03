import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import FileBase from "react-file-base64";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormHelperText from "@material-ui/core/FormHelperText";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#2A324B",
    fontSize: "1.5em",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
}));

export default function SignUp() {
  const classes = useStyles();
  let history = useHistory();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    street_name: "",
    district: "",
    description: "",
    selectedFile: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

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
      const response = await createUser(values);
      localStorage.setItem("token", response.data.token);
      history.push("/filter");
    } catch (e) {
      setErrorMessage(e.response?.data?.message || "Something went wrong");
    }
  };

  const createUser = async (values) => {
    return axios.post("http://localhost:8050/cafes", values);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register a Restaurant
        </Typography>
        <form className={classes.form} onSubmit={handleFormSubmit}>
          <FormHelperText error={true}>{errorMessage || " "}</FormHelperText>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label="Cafe name"
                value={values.name}
                onChange={handleInputValue}
                className={classes.formField}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                label="Email"
                value={values.email}
                onChange={handleInputValue}
                className={classes.formField}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="street_name"
                label="Street name"
                value={values.street_name}
                onChange={handleInputValue}
                className={classes.formField}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="district"
                label="District"
                value={values.district}
                onChange={handleInputValue}
                className={classes.formField}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                value={values.password}
                onChange={handleInputValue}
                type="password"
                label="Password"
                className={classes.formField}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                value={values.description}
                variant="outlined"
                label="Description"
                onChange={handleInputValue}
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                setValues({ ...values, selectedFile: base64 });
              }}
            />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
