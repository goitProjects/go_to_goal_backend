import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import styles from "./Restore.module.css";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

const Restore = () => {
  const [password, setPassword] = useState("");
  const [passwordRepeated, setPasswordRepeated] = useState("");
  const classes = useStyles();

  const onSubmit = e => {
    e.preventDefault();
    console.log({ password, passwordRepeated });
  };

  const onInput = ({ target: { id, value } }) => {
    console.log(id);
    switch (id) {
      case "password":
        setPassword(value.trim());
        console.log({ password });
        break;
      case "password_repeated":
        setPasswordRepeated(value.trim());
        console.log({ passwordRepeated });
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles["formWrapper"]} noValidate autoComplete="off">
      <form action="" className={styles["form"]} onSubmit={onSubmit}>
        <TextField
          id="password"
          label="New Password"
          className={classes.textField}
          value={password}
          onChange={onInput}
          margin="normal"
        />
        <TextField
          id="password_repeated"
          label="Repeat Password"
          className={classes.textField}
          value={passwordRepeated}
          onChange={onInput}
          margin="normal"
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Ok
        </Button>
      </form>
    </div>
  );
};

export default Restore;
