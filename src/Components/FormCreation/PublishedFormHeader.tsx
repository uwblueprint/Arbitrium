import React, { useState, useEffect } from "react";
import InputBase from "@material-ui/core/InputBase";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import PublishedFormDialog from "./Dialogs/PublishedFormDialog";
import ManageApplicantAccessDialog from "./Dialogs/ManageApplicantAccessDialog";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import SettingsIcon from "@material-ui/icons/Settings";

const DialogOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 150%;
  width: 100vw;
  z-index: 110;
  background: rgba(0, 0, 0, 0.5);
  .dialogButton {
    text-transform: none;
  }
`;

const Header = styled.div`
  box-sizing: border-box;
  height: 201px;
  width: 100%;
  box-shadow: 0 2px 3px 1px #cccccc;
  display: flex;
  background: #fafafa;
`;

const PublishedHeader = styled.div`
  box-sizing: border-box;
  height: 166px;
  width: 100%;
  background: #55a94e;
  display: flex;
`;

const TextWrapper = styled.div`
  padding-left: 15%;
  padding-right: 0px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`;

type Props = {
  name: string;
  description: string;
  submissionLink: string;
  onChange: (name: string, description: string) => void;
};

function PublishedFormHeader({
  name,
  description,
  submissionLink,
  onChange
}: Props): React.ReactElement<typeof Header> {
  const [formTitle, setFormTitle] = useState(name);
  const [formDescription, setFormDescription] = useState(description);

  useEffect(() => {
    setFormTitle(name);
    setFormDescription(description);
  }, [name, description]);

  const updateHeader = () => {
    onChange(formTitle, formDescription);
  };

  const [showPublishedFormDialog, setshowPublishedFormDialog] = useState(false);
  const [showManageAccessDialog, setshowManageAccessDialog] = useState(false);
  const [copiedsubmissionLink, setCopiedsubmissionLink] = useState(false);

  function closeDialog() {
    setshowPublishedFormDialog(false);
    setshowManageAccessDialog(false);
  }

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(submissionLink);
    var dummy = document.createElement("input");
    dummy.innerText = submissionLink;
    document.body.appendChild(dummy);
    dummy.setAttribute("id", "dummy_id");
    dummy.select();
    document.execCommand("copy");
    dummy.remove();
    setCopiedsubmissionLink(true);
  };

  return (
    <div>
      <PublishedHeader>
        <TextWrapper>
          <div
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <CheckCircleOutlineIcon
              style={{ color: "white", marginRight: 20 }}
            />
            <p style={{ color: "white", fontSize: 20 }}>
              {" "}
              This form has been published to applicants.{" "}
            </p>
          </div>
          <p style={{ color: "white" }}>
            {" "}
            If you published the form erroneously, make a copy of this form to
            keep editing.{" "}
          </p>
          <p style={{ color: "white" }}>
            {" "}
            If you need changes made to the form, please contact the Arbitrium
            team at{" "}
            <a href="mailto:arbitrium@uwblueprint.org">
              arbitrium@uwblueprint.org
            </a>{" "}
          </p>
        </TextWrapper>
      </PublishedHeader>
      <Header>
        <TextWrapper>
          <p
            style={{
              fontWeight: 400,
              fontSize: 20,
              letterSpacing: 0.25
            }}
          >
            {" "}
            This form is currently <b style={{ fontWeight: 700 }}>
              accepting
            </b>{" "}
            responses and not scheduled to close.
          </p>
          <p style={{ fontWeight: 400 }}>
            {" "}
            You can manually close the form or schedule a time for it to
            automatically close in “Manage Applicant Access”.
          </p>
          <div style={{ display: "flex", marginTop: 32, marginBottom: 32 }}>
            <Button
              variant="contained"
              onClick={() => {
                setshowManageAccessDialog(true);
              }}
              href="#text-buttons"
              color="primary"
              style={{
                backgroundColor: "#2261AD",
                marginLeft: "0px",
                marginBottom: "8px",
                textTransform: "none",
                letterSpacing: "1.25px",
                lineHeight: "16px",
                borderRadius: 5
              }}
            >
              <SettingsIcon style={{ marginRight: 8 }} />
              Manage Applicant Access
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setshowPublishedFormDialog(true);
              }}
              href="#text-buttons"
              color="primary"
              style={{
                marginLeft: 369,
                color: "#2261AD",
                marginRight: "16px",
                marginBottom: "8px",
                textTransform: "none",
                letterSpacing: "1.25px",
                lineHeight: "16px",
                padding: "10px 12px 10px 12px",
                border: "1px solid rgba(0, 0, 0, 0.33)",
                borderRadius: 4
              }}
            >
              Get Link for Applicants
            </Button>
          </div>
        </TextWrapper>
      </Header>
      {showPublishedFormDialog && (
        <>
          <DialogOverlay />
          <PublishedFormDialog
            link={submissionLink}
            close={closeDialog}
            copyLinkToClipboard={copyLinkToClipboard}
          />
        </>
      )}
      {showManageAccessDialog && (
        <>
          <DialogOverlay />
          <ManageApplicantAccessDialog
            link={submissionLink}
            close={closeDialog}
            copyLinkToClipboard={copyLinkToClipboard}
            publish={true}
            handlePublish={null}
          />
        </>
      )}
      <Snackbar
        open={copiedsubmissionLink}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        autoHideDuration={5000}
        resumeHideDuration={5000}
        onClose={() => {
          setCopiedsubmissionLink(false);
        }}
        message={"Copied to clipboard."}
      />
    </div>
  );
}

export default PublishedFormHeader;
