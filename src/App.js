import React, {Component}  from 'react';
import { Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import Navigation from "./Components/Navigation/Navigation";
import Header from "./Components/Header/Header";
import Header2 from "./Components/Header/Header2";
import Footer from "./Components/Footer/Footer";
import FlowSelector from "./Components/FlowSelector/FlowSelector";
import Container from "./Components/Container/Container";
import Home from "./Components/Home/Home";
import Application from "./Components/Application/Application";
import ApplicationsTable from './Components/List/ApplicationList/ApplicationsTable';
import Comparison from "./Components/Comparison/Comparison";

import { ConnectedRouter } from "connected-react-router";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import { history } from "./Store";
import "./App.css"
//import './App.css';

//Use this later for prod vs dev environment
//// TODO: Uncomment when express is setup
const proxy = process.env.NODE_ENV === "production" ? process.env.REACT_APP_SERVER : "http://localhost:4000";
//const proxy = "http://localhost:4000";


//Are we using this?
const browserHistory = createBrowserHistory();

export default class App extends Component {

  constructor(props) {
      super(props);


      this.state = {
          user: false
      };

  }

  getQuestionsAPI = async () => {
      const response = await fetch(proxy+'/api/questions', {
          headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
      });
      const body = await response.json();
      if (response.status !== 200) {
          throw Error(body.message);
      }
      return body;
  };

  getAllApplicationsAPI = async () => {
      const response = await fetch(proxy+'/api/applications', {
          headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
      });
      const body = await response.json();
      if (response.status !== 200) {
          throw Error(body.message);
      }
      return body;
  };

  postUserAPI = async (param) => {
      const response = await fetch(proxy+'/api/applications', {
          method: 'POST',
          body: JSON.stringify({
              username: "greg",
              passwrd: "insecure"
          }),
          headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
          },
      })

      const body = await response.json();
      if (response.status !== 201) {
          console.log(response);
          console.log("Error with posting saved-times");
      }

      console.log(body);
      return body;
  }

  componentDidMount() {
    //testing only
    console.log("We are here");

    /*
    console.log("Got questions");
    this.getQuestionsAPI().then((res) => {
        console.log("Got questions");
        let questions = [];
        res.forEach((question) => {
            console.log(question);
            questions.push(question);
        });
        this.setState({ Questions: questions });
    });
    */
    console.log("Got Applications");
    this.getAllApplicationsAPI().then((res) => {
        console.log("Got Applications");
        let apps = [];
        res.forEach((app) => {
            console.log(app);
            apps.push(app);
        });
        this.setState({ Apps: apps });
    });

    console.log("Is post user aPI getting run?");
    this.postUserAPI(null).then((res) => {
        console.log("Done");
    });

  }

  render() {
    const ApplicationsTablePage = (props) => {
        return (
            <ApplicationsTable
              getAllApplicationsAPI = {this.getAllApplicationsAPI}
            />
        )
    }

    console.log(this.state.Questions);
    console.log(this.state.Apps);

    return (
      <ThemeProvider theme={theme}>
        <div className="App">
        <header className="App-header">
          <ConnectedRouter history={history}>
            <>
              <Navigation/>
              <Header/>
              <Header2/>
              <Container>
                <Switch>
                  <Route exact={true} path="/" component={Home}></Route>
                  <Route
                    exact={true}
                    path="/applications"
                    component={ApplicationsTablePage}
                  ></Route>
                  <Route
                    path="/submissions/:organizationId"
                    component={Application}
                  ></Route>
                  <Route
                    path="/comparisons/:organizationId"
                    component={Comparison}
                  ></Route>
                </Switch>
              </Container>
            </>
          </ConnectedRouter>
          <Footer getQuestionsAPI={this.getQuestionsAPI}/>

          </header>
        </div>
      </ThemeProvider>
    );
  }
}
