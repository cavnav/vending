import React from "react";

import { Select } from "antd";

const Option = Select.Option;

export const SelectorFoodCategories = ({
  defaultValue,
  onChangeMenuItem,
  foods
}) => {
  return (
    <Select
      className="selectCategories"
      defaultValue={defaultValue}
      onChange={onChangeMenuItem}
    >
      {Object.values(foods).map(food => {
        return (
          <Option key={food.id} value={food.id}>
            {food.name}
          </Option>
        );
      })}
    </Select>
  );
};
