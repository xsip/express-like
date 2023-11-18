import 'reflect-metadata';
export function Response(
): PropertyDecorator & ParameterDecorator {
  return (target: object, key: string | symbol | undefined, index?: number) => {
    const tokenArgs = Reflect.getMetadata('tokenArgs',target,key as string) ?? [];
    Reflect.defineMetadata('tokenArgs',[...tokenArgs, {index, token: 'response'}], target,key as string);
  };
}