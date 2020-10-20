import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FormCard from "./FormCard";

const useStyles = makeStyles({
  collapse: {
    marginBottom: 16
  },
  content: { marginTop: -16 },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  root: {
    fontSize: 14,
    borderRadius: 0,
    borderTop: "8px solid #2261AD",
    boxShadow: "0 2px 3px 1px #cccccc",
    marginBottom: 20,
    width: 816
  },
  title: {
    color: "#000",
    fontSize: "20px",
    fontWeight: "500"
  },
  section_title: {
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    marginBottom: "0px",
    fontSize: "14px",
    backgroundColor: "#2261AD",
    color: "white",
    width: "fit-content",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "5px",
    paddingBottom: "5px"
  }
});

function FormSection({
  numSections,
  sectionNum,
  sectionData,
  questions,
  updateActiveSection,
  active
}) {
  const classes = useStyles();
  const [activeQuestion, setActiveQuestion] = useState(0);

  function updateActiveQuestion(sectionKey, questionKey) {
    updateActiveSection(sectionKey);
    if (activeQuestion !== questionKey) {
      setActiveQuestion(questionKey);
    }
  }

  // eslint-disable-next-line no-unused-vars
  function handleAddQuestion() {
    // TODO: add question to section within sections object
    // TODO: call the update section API endpoint
    // TODO: call updateActive
  }

  // eslint-disable-next-line no-unused-vars
  function handleMoveQuestion() {
    // TODO: update question location in section within sections object
    // TODO: call the update section API endpoint
    // TODO: call updateActive
  }

  async function handleUpdateQuestion(prevSection, prevQuestion) {
    // update recently de-selected question
    const response = await updateQuestion(
      appUser.currentProgram,
      prevSection,
      form.sections[prevSection].questions[prevQuestion]
    );

    // check status of update
    if (response.status !== 200) {
      console.error(`ERROR: Status - ${response.status}`);
    }
  }

  return (
    <div>
      <span className={classes.section_title}>
        Section {sectionNum} of {numSections}
      </span>
      <Card className={classes.root}>
        <CardHeader
          className={classes.title}
          title={sectionData.title}
          id={sectionNum}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardContent className={classes.content}>
          {sectionData.description}
        </CardContent>
      </Card>
      {questions.map((_question, questionKey) => (
        <FormCard
          key={questionKey + "_question"}
          active={active && activeQuestion === questionKey}
          handleActive={updateActiveQuestion}
          sectionKey={sectionNum - 1}
          questionKey={questionKey}
        />
      ))}
    </div>
  );
}

export default FormSection;
