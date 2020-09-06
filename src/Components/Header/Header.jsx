import React, { useState, useContext } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import UserDisplay from "./UserDisplay";
import AppIcon from "./svgIcon.tsx";
import LightTooltip from '@material-ui/core/Tooltip';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import usePromise from "../../Hooks/usePromise";
import * as GET from "../../requests/get";
import { loadProgram, loadApplications } from "../../Actions";
import { AuthContext } from "../../Authentication/Auth.js";
import { connect } from "react-redux";

export const HEADER_HEIGHT = 56;

const Container = styled.div`
  position: fixed;
  height: ${HEADER_HEIGHT}px;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 100;

  background: #FFFFFF;
  border-bottom: 1px solid #cccccc;
  align-items: center;
  justify-content: center;
`;

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
`;

const AppName = styled.div`
  display: inline-block;
  margin-left: 16px;
  margin-right: 16px;

  /* H5/ Roboto Regular 24 */
  font-family: Roboto;
  letter-spacing: 2px;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 28px;
`;

const AppToolTip = styled.div`
  .tooltip:hover .tooltiptext {
    visibility: hidden;
  }
`;

const UserDisplayWrapper = styled.div`
  margin-left: auto;
  height: 28px;

  /* H5/ Roboto Regular 24 */
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;

  color: #ffffff;
`;

//TODO: Use a globally defined font variable for tooltips
const useStyles = makeStyles((theme) => ({
  tooltip: {
    fontSize: "16px",
    maxWidth: "none"
  },
}));

async function updateProgram(program, loadProgram, loadApplications, currentUser) {
  loadProgram(program)

  const applications = await GET.getAllApplicationsAPI();
  let reviewCount = 0
  if (currentUser != null){
    reviewCount = await GET.getReviewCountAPI(currentUser.uid);
  }

  //Load the application data into redux
  loadApplications(applications, reviewCount);
}

function Header({ loadProgram, loadApplications }) {
  const { currentUser } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [loadPrograms] = usePromise(GET.getAllProgramsAPI, {}, []);
  const [program, setProgram] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (program) => {
    setAnchorEl(null);
    updateProgram(program, loadProgram, loadApplications, currentUser)
    setProgram(program)
  };

  if (!loadPrograms.isPending && program == null && loadPrograms.value != null) {
    updateProgram(loadPrograms.value[0], loadProgram, loadApplications, currentUser)
    setProgram(loadPrograms.value[0])
  }

  return (
    <Container>
      <BodyWrapper>
        <AppName>
          <Tooltip title="Arbitrium" classes={{ tooltip: useStyles().tooltip }}>
            <div>
              <AppIcon/>
            </div>
          </Tooltip>
        </AppName>

        <p> {program ? program.displayName : "Loading..."} </p>
        <div>
          <ArrowDropDownCircleOutlinedIcon style={{marginLeft: "4px", margin: "12px"}} onClick={handleClick}>
          </ArrowDropDownCircleOutlinedIcon>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => {setAnchorEl(null)}}
            style={{ marginTop: HEADER_HEIGHT/2}}
          >
            {!loadPrograms.isPending && loadPrograms.value ? (
              <div style={{border: '1px solid #ccc'}}>
                { loadPrograms.value.map((program, index) => (
                  <MenuItem key={index} onClick={() => handleSelect(program)}> {program.displayName}</MenuItem>
                ))}
              </div>
            ) : null }
          </Menu>
        </div>
        <UserDisplayWrapper>
          <UserDisplay />
        </UserDisplayWrapper>
      </BodyWrapper>
    </Container>
  );
}

const mapDispatchToProps = {
  loadProgram,
  loadApplications
};

const connectedAuth = connect(null, mapDispatchToProps)(Header);

export { connectedAuth as Header };
