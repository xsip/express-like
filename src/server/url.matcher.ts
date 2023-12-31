export class UrlMatcher {

  static isMatching = (url: string | undefined , route: string ) => {
    const urlSplit = url?.split('/') ?? [];
    const routeSplit = route.split('/')

    for (let index = 0; index < routeSplit.length; index++) {
      if(routeSplit[index][0] === ':' ){
        // thats a value
      }else{
        if(routeSplit[index] !== urlSplit[index] ){
          return false
        }
      }
    }
    return true;
  }
}