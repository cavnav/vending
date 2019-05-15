import React, { Component } from "react";
import { notification, Spin } from "antd";
import { IStateLoading } from "../store/loadingReducer";
import { LOADING, LOADED, FAILED_LOADING } from "../store/constants";
interface IProps {
  requestStatus: IStateLoading;
}

export class RequestStatus extends Component<IProps> {
  getConfig(status) {
    switch (status.type) {
      case LOADING:
        return (
          <div className="toCenterScreen">
            <Spin spinning={true} />
          </div>
        );
      case LOADED:
        return null;
      case FAILED_LOADING:
        notification.error({
          message: "Failed to load data",
          description: status.txt,
          placement: "bottomLeft"
        });

        return null;
      default:
        return null;
    }
  }

  render() {
    const { requestStatus } = this.props;
    return this.getConfig(requestStatus);
  }
}
