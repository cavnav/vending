import {
  PROJECTS_LOADED,
  SET_NAVIGATION_DATA,
  SET_NAVIGATION_HEADERS
} from "./constants";
import { LOADING, FAILED_LOADING } from "../constants";
import { loadProjects } from "../../services/";
import { StateProjects } from "./index";

export interface IActionLoadProjects {
  type: typeof PROJECTS_LOADED;
  projects: StateProjects;
}

export interface IRequestProjects {
  name?: string;
  created?: string;
  stars?: string;
  order?: string;
  per_page?: number;
  page?: number;
}

export function actionLoadProjects(request: IRequestProjects = {}) {
  return function(dispatch) {
    const { order, page, per_page, created, total } = request;
    const requestStr = `created:>${created}+language:javascript&sort=stars&order=${order}&page=${page}&per_page=${per_page}`;

    dispatch({ type: LOADING });

    return loadProjects(requestStr)
      .then(response => {
        dispatch({
          type: SET_NAVIGATION_HEADERS,
          navigation: {
            link: response.headers.get("Link")
          }
        });

        return response.json();
      })
      .then(json => {
        const navigation = {
          ...request,
          total: json.total_count || total
        };

        dispatch({ type: SET_NAVIGATION_DATA, navigation: navigation });

        let projects = json.items.map(project => ({
          id: project.id,
          name: project.full_name,
          stars: project.stargazers_count
        }));

        dispatch({ type: PROJECTS_LOADED, projects: projects });
      })
      .catch(e => {
        dispatch({ type: FAILED_LOADING, error: e });
      });
  };
}
