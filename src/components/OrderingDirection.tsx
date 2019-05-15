import React from "react";

export const OrderingDirection = props => (
  <span className="cursorToPointer" onClick={props.onClick}>
    {props.order === "desc" ? "\u25BC" : "\u25B2"}
  </span>
);
