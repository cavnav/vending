import React, { Component } from "react";
import { Project, OrderingDirection } from "./";
import { StateProjects, StateProjectsNavigation } from "../store";
interface IProps {
  projects: StateProjects;
  projectsNavigation: StateProjectsNavigation;
  actionLoadProjects: any;
}

export class Grid extends Component<IProps> {
  onClickOrderStars = e => {
    const { projectsNavigation, actionLoadProjects } = this.props;
    actionLoadProjects({
      ...projectsNavigation,
      order: projectsNavigation.order === "desc" ? "asc" : "desc"
    });
  };

  render() {
    const {
      projects,
      projectsNavigation: { page, per_page, order }
    } = this.props;

    function getMainIndex(index) {
      return (page - 1) * per_page + index + 1;
    }

    return (
      <div>
        <div className="grid-container">
          <div className="item-header">#</div>
          <div className="item-header">Name</div>
          <div className="item-header">
            Stars
            <OrderingDirection order={order} onClick={this.onClickOrderStars} />
          </div>
        </div>
        {projects.map((i, index) => (
          <Project key={index} index={getMainIndex(index)} data={i} />
        ))}
      </div>
    );
  }
}
