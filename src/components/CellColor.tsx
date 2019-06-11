import React from "react";

export class CellColor extends React.Component {
  render() {
    return <div style={{ background: this.props.val }} />;
  }
}
