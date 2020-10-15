import React, { useReducer, useEffect, useState, useContext } from "react";
import { HEADER_HEIGHT } from "../Header/Header";
import styled from "styled-components";
import FormCard from "./FormCard";
import FormSection from "./FormSection";
import { AuthContext } from "../../Authentication/Auth.js";
import * as FORM from "../../requests/forms.js";
import usePromise from "../../Hooks/usePromise";

import CreateEditFormHeader from "./CreateEditFormHeader";
import {
  CreateEditFormDispatchContext,
  CreateEditFormStateContext,
  defaultFormState
} from "./CreateEditFormStateManagement";
import customFormStateReducer from "../../Reducers/CustomFormStateReducer";

const Wrapper = styled.div`
  margin-top: ${HEADER_HEIGHT}px;
`;

const FormWrapper = styled.div`
  margin-top: 50px;
  padding-left: 15%;
`;

function CreateEditForm() {
  // eslint-disable-next-line no-unused-vars
  const { currentUser, appUser } = useContext(AuthContext);
  const [form, setForm] = useState({});
  const [activeSection, setActiveSection] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [formState, dispatch] = useReducer(
    customFormStateReducer,
    defaultFormState
  );
  const [loadForm, refetch] = usePromise(FORM.getForm, {
    formId: appUser.currentProgram
  });

  useEffect(() => {
    // Get form from databse using programID
    if (loadForm.isPending) return;
    const initialForm = loadForm.value;
    initialForm.sections = [
      {
        title: "About Your Charity",
        desc: "Section Type: Admin Info",
        questions: [
          {
            name: "Test",
            type: "short_answer",
            question: "What is the name of your charity?",
            required: ""
          },
          {
            name: "Test 2",
            type: "short_answer",
            question: "What is the name of your charity?",
            required: ""
          }
        ]
      },
      {
        title: "Untitled Section",
        desc: "Section Type: Decision Criteria",
        questions: [
          {
            type: "untitled",
            question: "Untitled Question",
            options: ["Option 1"],
            required: ""
          }
        ]
      }
    ];

    setForm(initialForm);
  }, [loadForm, appUser, refetch]);

  function updateActive(key, questionKey) {
    if (activeSection !== key) {
      // update database with new section (and questions) information
      setActiveSection(key);
      setActiveQuestion(questionKey);
    } else if (activeQuestion !== questionKey) {
      // update database with new question information
      setActiveQuestion(questionKey);
    }
  }

  // eslint-disable-next-line no-unused-vars
  function handleSaveAll() {
    // TODO: Create backend endpoint to update an entire form
    // TODO: Call to update the entire form.
    // (don't use in place of updateActive())
  }

  // eslint-disable-next-line no-unused-vars
  function handleAddSection() {
    // TODO: add section to sections object
    // TODO: call handleSave to update all sections
    // TODO: call updateActive
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

  // eslint-disable-next-line no-unused-vars
  function handleMoveSection() {
    // TODO: update section location in sections object
    // TODO: call handleSave to update all sections
    // TODO: call updateActive
  }

  return (
    <CreateEditFormStateContext.Provider value={formState}>
      <CreateEditFormDispatchContext.Provider value={dispatch}>
        <Wrapper>
          <CreateEditFormHeader />
          {form.sections &&
            form.sections.map((section, key) => (
              <FormWrapper key={key}>
                <FormSection
                  key={key + "_section"}
                  numSections={form.sections.length}
                  section={key + 1}
                  title={section.title}
                  description={section.desc}
                />
                {section.questions.map((_question, questionKey) => (
                  <FormCard
                    key={questionKey + "_question"}
                    active={
                      activeSection === key && activeQuestion === questionKey
                    }
                    handleActive={updateActive}
                    sectionKey={key}
                    questionKey={questionKey}
                  />
                ))}
              </FormWrapper>
            ))}
        </Wrapper>
      </CreateEditFormDispatchContext.Provider>
    </CreateEditFormStateContext.Provider>
  );
}

export default CreateEditForm;
