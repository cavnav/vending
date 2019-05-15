import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { projectsReducer } from "./projects/";
import { loadingReducer } from "./loadingReducer";
import { projectsNavigationReducer } from "./projects/navigation";

const rootReducer = combineReducers({
  projects: projectsReducer,
  requestStatus: loadingReducer,
  projectsNavigation: projectsNavigationReducer
});

export { StateProjectsNavigation } from "./projects/navigation";
export { StateProjects, IProject } from "./projects/";
export { IStateLoading } from "./loadingReducer";

export type IAppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(thunk));
}
