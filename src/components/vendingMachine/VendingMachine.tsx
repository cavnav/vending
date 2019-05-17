import React, { Component } from "react";
interface IProps {}
import { InputNumber, List, Avatar, Icon } from "antd";
import "./styles.css";

const foods = {
  beverages: {
    id: "beverages",
    name: "Напитки",
    items: [
      {
        id: 1,
        name: "Святой источник, 0.5, негаз",
        total: 7,
        exp: "20190707",
        price: 100,
        compos: `Тип воды
          питьевая
          Вид воды
          природная
          Артезианская
          да
          Материал упаковки
          пластик
          Стандарты производства
          ГОСТ Р 52109-2003
          Состав
          кальций <80, магний <20, калий <20, гидрокарбонаты <250, хлориды <150, сульфаты <50`,
        img: ""
      },
      { id: 2, name: "Шишкин лес, 0.4, негаз", img: "" },
      { id: 3, name: "Сенежская, 0.5, негаз" }
    ]
  },
  sandwiches: {
    id: "sandwiches",
    name: "Сэндвичи",
    items: []
  }
};

export class VendingMachine extends Component<IProps> {
  state = {
    isMenuVisible: true,
    selectedMenuItem: {},
    selectedMenuItemId: "",
    orderItems: {}
  };

  onClickMenuItem = id => () => {
    console.log(id, foods[id].items);
    this.setState({
      selectedMenuItem: foods[id].items,
      selectedMenuItemId: id,
      isMenuVisible: false
    });
  };

  onClickBackMenu = () => {
    this.setState({
      isMenuVisible: true
    });
  };

  onAddFoodToCart = food => () => {
    this.setState((prevState, nextProps) => {
      console.log(prevState);
      const id = `${prevState.selectedMenuItemId}_${food.id}`;
      const num = prevState.orderItems[id] ? prevState.orderItems[id].num++ : 1;
      const sum = num * food.price;
      return {
        orderItems: {
          ...food,
          id,
          num,
          sum
        }
      };
    });
  };

  componentDidMount() {}

  render() {
    const { selectedMenuItem, isMenuVisible, orderItems } = this.state;
    const MyIcon = Icon.createFromIconfontCN({
      scriptUrl: "//at.alicdn.com/t/font_1195976_r7hpy6nfkha.js" // generated by iconfont.cn
    });
    return (
      <div className="machine">
        <div className="inner">
          {isMenuVisible && (
            <div className="menu">
              <List
                dataSource={Object.values(foods)}
                renderItem={food => (
                  <List.Item onClick={this.onClickMenuItem(food.id)}>
                    {food.name}
                  </List.Item>
                )}
              />
            </div>
          )}
          {!isMenuVisible && (
            <div>
              <span className="backToMenu" onClick={this.onClickBackMenu}>
                Меню
              </span>
              <div className="menuItem">
                <List
                  dataSource={selectedMenuItem}
                  renderItem={item => (
                    <List.Item
                      actions={[
                        <Icon
                          type="shopping-cart"
                          onClick={this.onAddFoodToCart(item)}
                        />
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src="{item.img}" />}
                        title={item.name}
                        description={false && item.compos}
                      />
                    </List.Item>
                  )}
                />
              </div>
              <div className="order">
                <div className="tacenter">
                  <MyIcon className="orderIcon" type="icon-receipt" />
                </div>
                <List
                  dataSource={orderItems}
                  renderItem={item => (
                    <List.Item
                      actions={[
                        <Icon type="minus" />,
                        <span>{item.num}</span>,
                        <Icon type="plus" />,
                        <span>{item.sum}</span>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src="{item.img}" />}
                        title={item.name}
                        description={false && item.compos}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </div>
          )}
        </div>
        {/*        <div className="glass" /> */}
        <div className="tray-inner">push</div>
      </div>
    );
  }
}
