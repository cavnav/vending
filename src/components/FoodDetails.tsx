import React from "react";

export const FoodDetails = ({ item }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        color: "white"
      }}
    >
      <img src={item.img} style={{ maxWidth: "100%" }} />
      <div>{item.compos}</div>
    </div>
  );
};
