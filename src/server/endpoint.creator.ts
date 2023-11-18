import http from 'http';
type RequestCallback = (req?: http.IncomingMessage, res?: http.ServerResponse<http.IncomingMessage> & {req: http.IncomingMessage}) => Promise<any>;

interface Route {
  route: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  callback: RequestCallback;
  controller?: any;
  fnName?: any;
}

export const routes: Route[] = []


export const addGetEndpoint = (controller: any, fnName: any,route: string, callback: RequestCallback) => {
  routes.push({
    route,
    method: 'GET',
    callback,
    controller,
    fnName
  })
}
export const addPostEndpoint = (route: string, callback: RequestCallback) => {
  routes.push({
    route,
    method: 'POST',
    callback
  })
}