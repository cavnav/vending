import React, { Component } from "react";
interface IProps {}
import { ConfigProvider, Spin, InputNumber, List, Avatar, Icon } from "antd";
import { FoodDetails } from "./FoodDetails";
import { Menu } from "./Menu";
import { SelectorFoodCategories } from "./SelectorFoodCategories";
import { FoodCategoryItems } from "./FoodCategoryItems";

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
        price: 50,
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
        img: "./assets/drinks/saintSpring.jpg"
      },
      {
        id: 2,
        name: "Шишкин лес, 0.4, негаз",
        img: "./assets/drinks/shiskinLes.jpg",
        total: 7,
        price: 50
      },
      {
        id: 3,
        name: "Сенежская, 0.5, негаз",
        img: "./assets/drinks/senejskaya.jpg",
        total: 7,
        price: 55
      },
      {
        id: 4,
        name: "Липецкий бювет, 0.5, негаз",
        img: "",
        total: 7,
        price: 55
      }
    ]
  },
  sandwiches: {
    id: "sandwiches",
    name: "Сэндвичи",
    items: [
      {
        id: 1,
        name: "Бутерброд с курицей, 80 г",
        total: 7,
        exp: "20190707",
        price: 70,
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
        img: "./assets/sandwiches/hen.jpg"
      },
      {
        id: 2,
        name: "Бутерброд с тунцом, 95 г",
        total: 7,
        exp: "20190707",
        price: 90,
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
        img: "./assets/sandwiches/tuna.jpg"
      },
      {
        id: 3,
        name: "Лепёшка с зеленью, 175г",
        total: 7,
        exp: "20190707",
        price: 160,
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
        img: "./assets/sandwiches/tortilla.jpg"
      }
    ]
  }
};

export class VendingMachine extends Component<IProps> {
  state = {
    isMenuVisible: true,
    isOrderPayVisible: false,
    isMenuItemsVisible: false,
    isThankForShoppingVisible: false,
    isTrayTextVisible: false,
    isOrderItemsVisible: true,
    isFoodItemComposVisible: false,
    selectedMenuItem: {},
    selectedMenuItemId: "",
    orderItems: {},
    selectedFoodItem: {}
  };

  onChangeMenuItem = id => {
    this.setState({
      selectedMenuItem: foods[id].items,
      selectedMenuItemId: id,
      isMenuVisible: false,
      isMenuItemsVisible: true,
      isOrderPayVisible: false,
      isOrderItemsVisible: true,
      isThankForShoppingVisible: false,
      isTrayTextVisible: false
    });
  };

  onClickMenuItem = id => () => {
    this.onChangeMenuItem(id);
  };

  onClickFoodItem = food => () => {
    this.setState({
      isFoodItemComposVisible: true,
      selectedFoodItem: food
    });
  };

  onClickBackMenu = () => {
    this.setState({
      isMenuVisible: true,
      isOrderPayVisible: false,
      isMenuItemsVisible: false,
      isThankForShoppingVisible: false,
      isTrayTextVisible: false,
      isOrderItemsVisible: true
    });
  };

  onAddFoodToCart = food => () => {
    this.setState((state, nextProps) => {
      const id = this.getOrderItemId(food.id);
      const num = state.orderItems[id] ? state.orderItems[id].num + 1 : 1;
      const sum = num * food.price;

      let newOrderItems;

      if (num === 1) {
        newOrderItems = {
          orderItems: {
            [id]: {
              ...food,
              id,
              num,
              sum
            },
            ...state.orderItems
          }
        };
      } else {
        newOrderItems = {
          orderItems: {
            ...state.orderItems,
            [id]: {
              ...food,
              id,
              num,
              sum
            }
          }
        };
      }

      return newOrderItems;
    });
  };

  onDeleteFood = id => () => {
    this.setState(state => {
      let newOrderItems = { ...state.orderItems };
      delete newOrderItems[id];
      return {
        orderItems: newOrderItems
      };
    });
  };

  onChangeItemNum = food => number => {
    this.setState((state, nextProps) => {
      const num = number;
      const sum = num * food.price;
      return {
        orderItems: {
          ...this.state.orderItems,
          [food.id]: {
            ...food,
            num,
            sum
          }
        }
      };
    });
  };

  onCloseFoodDetails = () => {
    this.setState({
      isFoodItemComposVisible: false,
      selectedFoodItem: {}
    });
  };

  onClickPay = () => {
    this.setState({
      isOrderPayVisible: true,
      isMenuVisible: false,
      isMenuItemsVisible: false,
      isThankForShoppingVisible: false,
      isTrayTextVisible: false,
      isOrderItemsVisible: false
    });
  };

  onPay = () => {
    this.setState({
      isOrderPayVisible: false,
      isMenuVisible: false,
      isMenuItemsVisible: false,
      isThankForShoppingVisible: true,
      isOrderItemsVisible: false,
      orderItems: []
    });

    setTimeout(() => {
      this.setState({
        isTrayTextVisible: true,
        isMenuVisible: true,
        isThankForShoppingVisible: false,
        isOrderItemsVisible: true
      });
    }, 5000);
  };

  getOrderItemId = id => `${this.state.selectedMenuItemId}_${id}`;

  getOrderSum = () => {
    const { orderItems } = this.state;
    return Object.values(orderItems).reduce((sum, next) => sum + next.sum, 0);
  };

  componentDidMount() {}

  render() {
    const {
      selectedMenuItem,
      selectedMenuItemId,
      isMenuVisible,
      isMenuItemsVisible,
      isThankForShoppingVisible,
      isTrayTextVisible,
      orderItems,
      isOrderPayVisible,
      isOrderItemsVisible,
      isFoodItemComposVisible
    } = this.state;

    const customizeRenderEmpty = () => (
      <div>
        <Icon type="shopping-cart" style={{ fontSize: 80 }} />
      </div>
    );
    const orderItemsVals = Object.values(orderItems);
    const MyIcon = Icon.createFromIconfontCN({
      scriptUrl: "//at.alicdn.com/t/font_1195976_c20y2ritutp.js" // generated by iconfont.cn
    });

    return (
      <div className="machine">
        <div
          className={`inner display-flex flex-column ${
            isOrderPayVisible || isThankForShoppingVisible ? "flex-center" : ""
          }`}
        >
          {isMenuVisible && (
            <Menu List={List} foods={foods} clickItem={this.onClickMenuItem} />
          )}
          {isMenuItemsVisible && (
            <div className="categoryItemsBox flex-g-one">
              <SelectorFoodCategories
                foods={foods}
                defaultValue={this.state.selectedMenuItemId}
                onChangeMenuItem={this.onChangeMenuItem}
              />
              {isFoodItemComposVisible && (
                <Icon
                  type="close-circle"
                  className="foodDetailsCloseBtn font-32"
                  onClick={this.onCloseFoodDetails}
                />
              )}
              <div className="categoryItems">
                {isFoodItemComposVisible && (
                  <FoodDetails item={this.state.selectedFoodItem} />
                )}
                {!isFoodItemComposVisible && (
                  <FoodCategoryItems
                    category={selectedMenuItem}
                    onAddFoodToCart={this.onAddFoodToCart}
                    onClickFoodItem={this.onClickFoodItem}
                  />
                )}
              </div>
            </div>
          )}
          {isOrderItemsVisible && (
            <div className="order-box">
              <hr />
              <div className="ta-center">Ваш заказ</div>
              <div className="order-sum display-flex">
                <MyIcon className="orderIcon" type="icon-receipt" />
                <span className="flex-g-one font-24 font-800 margin-l-4">
                  {this.getOrderSum()}р
                </span>
                {this.getOrderSum() > 0 && this.state.orderItems && (
                  <button onClick={this.onClickPay}>Оплатить</button>
                )}
              </div>
              <div className="order">
                <ConfigProvider renderEmpty={customizeRenderEmpty}>
                  <List
                    dataSource={orderItemsVals}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={item.img} />}
                          title={item.name}
                          description={
                            <div style={{ display: "flex" }}>
                              <InputNumber
                                size="small"
                                min={1}
                                max={item.total}
                                value={item.num}
                                onChange={this.onChangeItemNum(item)}
                              />
                              <span className="itemSum">{item.sum}р</span>
                              <Icon
                                type="close-circle"
                                onClick={this.onDeleteFood(item.id)}
                              />
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </ConfigProvider>
              </div>
            </div>
          )}
          {isOrderPayVisible && (
            <div className="flex-center">
              <MyIcon
                className="payIcon"
                type="icon-nfc"
                onClick={this.onPay}
              />
              <span className="margin-l-4">
                Для оплаты, приложите банковскую карту к экрану
              </span>
            </div>
          )}
          {isThankForShoppingVisible && (
            <div className="ta-center">
              Спасибо за покупку! <br />
              Ваш заказ готовится к выдаче
              <div>
                <Spin />
              </div>
            </div>
          )}
        </div>

        <div className="glass" />
        <div className="tray-inner flex-center">
          <span className={`${isTrayTextVisible && "tray-text"}`}>
            Заберите заказ
          </span>
        </div>
      </div>
    );
  }
}
