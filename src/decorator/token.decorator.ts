export function InjectToken<T = any>(
  token?: T,
): PropertyDecorator & ParameterDecorator {
  return (target: object, key: string | symbol | undefined, index?: number) => {
    const tokenArgs = Reflect.getMetadata('tokenArgs',target) ?? [];
    Reflect.defineMetadata('tokenArgs',[...tokenArgs, {index, token}], target);
  };
}