import React from "react";

export const CellColor = props => {
  console.log(props.val);
  return <div style={{ background: props.val }} />;
};
