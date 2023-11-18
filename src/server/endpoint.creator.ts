import http from 'http';
type RequestCallback = (req?: http.IncomingMessage, res?: http.ServerResponse<http.IncomingMessage> & {req: http.IncomingMessage}) => Promise<any>;

interface Route {
  route: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  callback: RequestCallback;
}

export const routes: Route[] = []


export const addGetEndpoint = (route: string, callback: RequestCallback) => {
  routes.push({
    route,
    method: 'GET',
    callback
  })
}
export const addPostEndpoint = (route: string, callback: RequestCallback) => {
  routes.push({
    route,
    method: 'POST',
    callback
  })
}