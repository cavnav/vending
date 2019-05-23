import React from "react";

export const Menu = ({ List, foods, clickItem }) => {
  return (
    <div className="menu">
      <List
        dataSource={Object.values(foods)}
        renderItem={food => (
          <List.Item onClick={clickItem(food.id)}>{food.name}</List.Item>
        )}
      />
    </div>
  );
};
