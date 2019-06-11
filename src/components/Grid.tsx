import React from "react";
import { Cell } from "./Cell";
const data1 = {
  a1: {
    type: "txt",
    val: 1
  },
  a2: {
    type: "txt",
    val: 2
  },
  b1: {
    type: "txt",
    val: 3
  },
  b2: {
    type: "txt",
    val: "'1'"
  }
};

export class Grid extends React.Component {
  state = {
    command: "",
    address: "",
    data: data1
  };

  render() {
    const dataLength = Object.values(this.state.data).length / 2;
    return (
      <div>
        <div
          id="grid"
          className={`gridTeplateRows-${dataLength} gridTemplateColumns-${dataLength}`}
        >
          {Object.values(this.state.data).map((i, ind) => {
            const CellX = Cell[i.type];
            return <CellX key={ind} val={i.val} />;
          })}
        </div>
        <br />
        <input
          value={this.state.command}
          onKeyDown={this.onKeyDown}
          onChange={this.onChangeCommand}
        />
      </div>
    );
  }

  onChangeCommand = command => {
    console.log(command.target.value);
    this.setState({
      command: command.target.value
    });
  };

  onKeyDown = e => {
    const { data, command = "" } = this.state;
    const address = (command.match(/(\w+\d+).*=/) || [])[1];
    let myEval;

    if (e.key === "Enter") {
      console.log("enter");
      try {
        myEval = this.myEval(data, command);
      } catch (e) {
        this.setState({
          command: "ошибка"
        });
        return;
      }

      if (!address) {
        this.setState({
          command: myEval
        });
        return;
      }
      this.setState({
        data: {
          ...data,
          ...{ [address]: { ...data[address], val: myEval } }
        },
        command: myEval
      });
    }
  };

  myEval = (context, js) => {
    let keys = Object.keys(context);
    let vals = Object.values(context).map(i => i.val);
    let evalContext = keys.reduce((res, next, i) => {
      res += `var ${next}=${vals[i]};\n`;
      console.log(res);
      return res;
    }, "");

    let res = `var res = ${js}; \n`;
    res += `if (res.constructor === string) { \n`;
      res += `res = res.trim().split(' '); \n`;
      res += `res = res.reduce((res, next) => culori.interpolate([res, next])(0.5)); \n`;
      res += `res = res.trim().split(' '); \n`;
    res += `}; \n`;

    return eval(evalContext + js);

    //a1 = a1 + a2 = '_red_yellow_'
    // culori.interpolate([a1, a2])(0.5)
    function getValues(key) {
      ret
    }
  };
}
