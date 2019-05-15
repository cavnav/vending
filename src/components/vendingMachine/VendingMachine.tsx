import React, { Component } from "react";
interface IProps {}

import { List } from "antd";
const data = ["Напитки", "Сендвичи"];

export class VendingMachine extends Component<IProps> {
  onClickMenuItem = e => {
    console.log("clickMenuItem", e);
  };

  render() {
    const {} = this.props;

    return (
      <div>
        <div className="machine">
          <div className="inner">
            <List
              header={<div>Header</div>}
              footer={<div>Footer</div>}
              bordered
              dataSource={data}
              renderItem={item => (
                <List.Item onClick={this.onClickMenuItem}>{item}</List.Item>
              )}
            />
          </div>
          <div className="glass" />
          <div className="tray-inner">push</div>
        </div>
      </div>
    );
  }
}
