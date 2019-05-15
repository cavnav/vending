import { PROJECTS_LOADED } from "./constants";
import { IActionLoadProjects } from "./actions";

export interface IProject {
  id: number;
  name: string;
  stars: string;
}

export type StateProjects = IProject[];

const initialState: StateProjects = [];

export function projectsReducer(
  state = initialState,
  action: IActionLoadProjects
): StateProjects {
  switch (action.type) {
    case PROJECTS_LOADED: {
      return action.projects;
    }
    default:
      return state;
  }
}
