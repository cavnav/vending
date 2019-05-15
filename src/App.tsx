import * as React from "react";
import { connect } from "react-redux";
import {
  IAppState,
  StateProjects,
  IStateLoading,
  StateProjectsNavigation
} from "./store";
import { VendingMachine } from "./components/";
import { actionLoadProjects } from "./store/projects/actions";
import "antd/dist/antd.css";
import "./styles.css";

interface IProps {
  projects: StateProjects;
  requestStatus: IStateLoading;
  projectsNavigation: StateProjectsNavigation;
  actionLoadProjects: any;
}

class App extends React.Component<IProps> {
  state = {};

  render() {
    const {} = this.props;
    return (
      <div>
        <VendingMachine />
      </div>
    );
  }
}

const mapStateToProps = (state: IAppState) => {
  let { projects, requestStatus, projectsNavigation } = state;
  return {
    projects,
    requestStatus,
    projectsNavigation
  };
};

export default connect(
  mapStateToProps,
  {
    actionLoadProjects
  }
)(App);
