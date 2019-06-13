import React from "react";
import { Cell } from "./Cell";
import colors from "../colors";
const data1 = {
  a1: {
    type: "color",
    val: "#FF0000"
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
    type: "color",
    val: "#FFFF00"
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
        console.log(e);
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
    let vals = Object.values(context).map(i => {
      return i.val.constructor === String ? `"${i.val}"` : i.val;
    });
    let evalContext = keys.reduce((res, next, i) => {
      res += `var ${next}=${vals[i]};\n`;
      console.log(res);
      return res;
    }, "");

    let colorsLib = colors;
    let res = "";
    res += `var res = ${js}; \n`;
    res += `if (res.constructor === String) { \n`;
    res += `res = res.trim().split('#').filter(i=>i); \n`;
    res += `console.log(res); \n`;
    res += `res = '#' + colorsLib.mix(res, {result: 'rgb'}); \n`;
    res += `}; \n`;

    console.log("res", evalContext + res);
    return eval(evalContext + res);

    function getValues(key) {
      ret;
    }
  };
}
