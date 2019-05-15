import { IDLE, LOADING, LOADED, FAILED_LOADING } from "./constants";
import { PROJECTS_LOADED } from "./projects/constants";

export interface IStateLoading {
  type: string;
  txt: string;
}

const INIT_STATE: IStateLoading = {
  type: IDLE,
  txt: ""
};

export const loadingReducer = (
  state = INIT_STATE,
  action: any = {}
): IStateLoading => {
  switch (action.type) {
    case LOADING:
      return {
        type: LOADING,
        txt: ""
      };
    case PROJECTS_LOADED:
      return {
        type: LOADED,
        txt: ""
      };
    case FAILED_LOADING:
      return {
        type: FAILED_LOADING,
        txt: action.error.message
      };
    default:
      return state;
  }
};
