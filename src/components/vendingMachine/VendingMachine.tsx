import React, { Component } from "react";
interface IProps {}
import { List, Avatar, Icon } from "antd";
import "./styles.css";

const dataMenu = [
  { id: "beverages", name: "Напитки" },
  { id: "sandwiches", name: "Сэндвичи" }
];

const foods = {
  beverages: [
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
};

export class VendingMachine extends Component<IProps> {
  state = {
    isMenuVisible: true,
    selectedMenuItem: {}
  };

  onClickMenuItem = selectedMenuItem => () => {
    console.log(selectedMenuItem, foods);
    this.setState({
      selectedMenuItem: foods[selectedMenuItem],
      isMenuVisible: false
    });
  };

  onClickBackMenu = () => {
    this.setState({
      isMenuVisible: true
    });
  };

  componentDidMount() {}

  render() {
    const { selectedMenuItem, isMenuVisible } = this.state;

    return (
      <div className="machine">
        <div className="inner">
          {isMenuVisible && (
            <div className="menu">
              <List
                dataSource={dataMenu}
                renderItem={item => (
                  <List.Item onClick={this.onClickMenuItem(item.id)}>
                    {item.name}
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
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src="{item.img}" />}
                        title={item.name}
                        description={false && item.compos}
                      />
                      <Icon type="minus" />
                      <Icon type="shopping-cart" />
                      <Icon type="plus" />
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
