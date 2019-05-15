import {
  SET_NAVIGATION_DATA,
  SET_NAVIGATION_HEADERS,
  NAVIGATION_PER_PAGE
} from "./constants";
import moment from "moment";

export type StateProjectsNavigation = {
  total: number;
  name?: string;
  created?: string;
  stars?: string;
  order?: string;
  per_page?: number;
  page?: number;
};

const initialState: StateProjectsNavigation = {
  total: 0,
  order: "desc",
  page: 1,
  per_page: NAVIGATION_PER_PAGE,
  created: moment()
    .subtract(1, "month")
    .format("YYYY-MM-DD")
};

export function projectsNavigationReducer(
  state = initialState,
  action: any = {}
): StateProjectsNavigation {
  switch (action.type) {
    case SET_NAVIGATION_HEADERS:
    case SET_NAVIGATION_DATA: {
      return {
        ...state,
        ...action.navigation
      };
    }
    default:
      return state;
  }
}
