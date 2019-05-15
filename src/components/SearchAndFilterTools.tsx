import React, { Component } from "react";
import { connect } from "react-redux";
import {
  actionLoadProjects,
  IRequestProjects
} from "../store/projects/actions";
import { IAppState, StateProjectsNavigation } from "../store";
import { Pagination, Button } from "antd";

interface IProps {
  projectsNavigation: StateProjectsNavigation;
  actionLoadProjects: any;
}

class SearchAndFilterTools extends Component<IProps> {
  state: IRequestProjects;
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.actionLoadProjects(this.props.projectsNavigation);
  }

  onChangePagination = (page, pageSize) => {
    const newState = {
      ...this.props.projectsNavigation,
      page,
      per_page: pageSize
    };

    this.props.actionLoadProjects(newState);
  };

  paginationShowTotal = (total, range) => {
    return total;
  };

  render() {
    const {
      projectsNavigation: { total, per_page }
    } = this.props;

    return (
      <div style={{ margin: "10px" }}>
        <Pagination
          onChange={this.onChangePagination}
          defaultPageSize={per_page}
          showQuickJumper={true}
          showSizeChanger={true}
          showTotal={this.paginationShowTotal}
          total={total}
        />
      </div>
    );
  }
}

function mapStateToProps(state: IAppState) {
  return {
    projectsNavigation: state.projectsNavigation
  };
}

export default connect(
  mapStateToProps,
  { actionLoadProjects }
)(SearchAndFilterTools);
