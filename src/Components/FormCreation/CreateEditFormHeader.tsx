import React from "react";
import InputBase from "@material-ui/core/InputBase";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const Header = styled.div`
  padding: 48px 100px;
  padding-left: 15%;
  box-sizing: border-box;
  height: 176px;
  box-shadow: 0 2px 3px 1px #cccccc;
`;

const NameInput = styled(InputBase)`
  input {
    font-size: 24px;
  }
  && {
    width: 846px;
    margin-bottom: 16px;
    line-height: 36px;
  }
`;

const DescriptionInput = styled(InputBase)`
  && {
    width: 846px;
    display: block;
    line-height: 21px;
    overflow-y: auto;
    max-height: 48px;
  }
  textarea {
    font-size: 14px;
    color: #888888;
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  padding-bottom: 86px;
  top: 112px;
  right: 35%;
`;

type HeaderData = {
  name: string;
  description: string;
};

type Props = {
  name: string;
  description: string;
  onChange: (data: HeaderData) => void;
};

function CreateEditFormHeader({
  name,
  description,
  onChange
}: Props): React.ReactElement<typeof Header> {
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      name: e.target.value,
      description
    });
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      name,
      description: e.target.value
    });
  };

  return (
    <Header>
      <NameInput placeholder="Form name" value={name} onChange={onNameChange} />
      <DescriptionInput
        multiline
        placeholder="Form description..."
        value={description}
        onChange={onDescriptionChange}
      />
      <ButtonWrapper>
        <Button
          variant="outlined"
          onClick={() => {}}
          href="#text-buttons"
          color="primary"
          style={{
            marginRight: "16px",
            marginBottom: "8px",
            textTransform: "none",
            letterSpacing: "1.25px",
            lineHeight: "16px",
            padding: "10px 12px 10px 12px",
            border: "1px solid rgba(0, 0, 0, 0.33)"
          }}
        >
          Get Preview Link
        </Button>
        <Button
          variant="contained"
          onClick={() => {}}
          href="#text-buttons"
          color="primary"
          style={{
            marginLeft: "0px",
            marginBottom: "8px",
            textTransform: "none",
            letterSpacing: "1.25px",
            lineHeight: "16px",
            padding: "10px 12px 10px 12px"
          }}
        >
          Publish
        </Button>
      </ButtonWrapper>
    </Header>
  );
}

export default CreateEditFormHeader;
