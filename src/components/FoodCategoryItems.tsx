import React from "react";

import { List, Icon, Avatar } from "antd";

export const FoodCategoryItems = ({
  category,
  onAddFoodToCart,
  onClickFoodItem
}) => {
  return (
    <List
      dataSource={category}
      renderItem={item => (
        <List.Item
          actions={[
            <Icon
              type="shopping-cart"
              className="font-24"
              onClick={onAddFoodToCart(item)}
            />
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.img} />}
            title={item.name}
            description={false && item.compos}
            onClick={onClickFoodItem(item)}
          />
        </List.Item>
      )}
    />
  );
};
