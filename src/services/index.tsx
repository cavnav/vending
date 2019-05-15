const REST_URL = "https://api.github.com/search/repositories";

export function loadProjects(request: string): Promise<any> {
  const proxy = "https://cors-anywhere.herokuapp.com/";
  return fetch(`${proxy}${REST_URL}?q=${request}`);
}
