import React, { Component } from "react";
interface IProps {}
import { List, Icon } from "antd";
import "./styles.css";

const data = [{ id: 1, name: "Напитки" }, { id: 2, name: "Сэндвичи" }];

export class VendingMachine extends Component<IProps> {
  onClickMenuItem = id => () => {
    console.log("clickMenuItem", id);
  };

  render() {
    const {} = this.props;

    return (
      <div className="machine">
        <div className="inner">
          <div className="menu">
            <List
              dataSource={data}
              renderItem={item => (
                <List.Item onClick={this.onClickMenuItem(item.id)}>
                  {item.name}
                </List.Item>
              )}
            />
          </div>
        </div>
        {/*        <div className="glass" /> */}
        <div className="tray-inner">push</div>
      </div>
    );
  }
}
