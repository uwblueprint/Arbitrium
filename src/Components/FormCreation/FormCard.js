import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import AddCardComponent from "./AddCardComponent";

const useStyles = makeStyles({
  collapse: {
    marginBottom: 16
  },
  content: {
    marginTop: -16
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  root: () => ({
    fontSize: 14,
    borderRadius: 0,
    boxShadow: "0 2px 3px 1px #cccccc",
    marginBottom: 20,
    width: 816
  }),
  active: () => ({
    fontSize: 14,
    borderRadius: 0,
    borderLeft: `4px solid #2261AD`,
    boxShadow: "0 2px 3px 1px #cccccc",
    marginBottom: 20,
    width: 816
  }),
  title: {
    color: "#000",
    fontSize: "20px",
    fontWeight: "500"
  }
});

//Other props { numCards, card, type, question, options, required }
//commented due to lint error
function FormCard({ card, question, active }) {
  const classes = useStyles();

  return (
    <div style={{ display: "flex" }}>
      <Card className={active ? classes.active : classes.root}>
        <CardHeader
          classes={{ title: classes.title }}
          title={question}
          id={card}
        />
        <CardContent classes={{ root: classes.content }}>todo</CardContent>
      </Card>
      {active ? <AddCardComponent /> : null}
    </div>
  );
}

export default FormCard;
