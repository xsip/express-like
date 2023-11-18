import 'reflect-metadata';
export function Request(
): PropertyDecorator & ParameterDecorator {
  return (target: object, key: string | symbol | undefined, index?: number) => {
    const tokenArgs = Reflect.getMetadata('tokenArgs',target,key as string) ?? [];
    Reflect.defineMetadata('tokenArgs',[...tokenArgs, {index, token: 'request'}], target,key as string);
  };
}