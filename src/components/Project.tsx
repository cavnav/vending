import React, { Component } from "react";
import { IProject } from "../store";

interface IProps {
  data: IProject;
  index: number;
}
interface IState {}

export class Project extends Component<IProps, IState> {
  render() {
    let {
      data: { name, stars },
      index
    } = this.props;

    return (
      <div className="grid-container">
        <div className="item">{index}</div>
        <div className="item">{name}</div>
        <div className="item">{stars}</div>
      </div>
    );
  }
}
