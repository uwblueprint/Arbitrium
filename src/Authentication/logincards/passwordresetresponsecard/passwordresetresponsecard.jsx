import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import React from 'react';

import styled from "styled-components";

const CommentForm = styled.form`
  .textFields {
    margin-bottom: 20px;
    width: 100%;
  }
  button {
    display: flex;
    justify-content: end;
  }
  a {
    font-size: 0.9rem;
  }
  .backToLogin {
    position: absolute;
    height: 36px;
    right: 0px;
    top: 210px;
    margin-left: 10px;
  }

.emailSentTitle{
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: initial;
  margin-bottom: 5px;
}

.emailSentText{
  font-family: Roboto;
  font-weight: normal;
  font-size: 14px;
  text-align: initial;
  margin-bottom: 25px;
}

.resendLink {
    color: #005EB8;
    text-decoration: underline;
    cursor: pointer;
}
`;

const PasswordResetResponseCard= (props) => {

    return (
        <CommentForm>
          <div className="emailSentTitle">
            Email has been sent!
          </div>
          <div className="emailSentText">
            Please check your inbox and click the link to change your password.<br /><br />
            Didn't receive the email? <a className="resendLink" onClick={()=>props.setLoginFlowState({cardType: 'passwordResetEmail'})}>Resend</a>
          </div>
        <CardActions>
          <Button className="backToLogin"  
                  variant="contained"
                  color="primary"
                  onClick={()=>props.setLoginFlowState({cardType: 'loginFields'})}>Back</Button>
        </CardActions>
      </CommentForm>
    )
}

export default PasswordResetResponseCard;