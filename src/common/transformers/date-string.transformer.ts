import { Transform, TransformFnParams } from 'class-transformer';

export function DateStringTransform() {
  return Transform(
    ({ value }: TransformFnParams) => {
      if (value instanceof Date && !isNaN(Number(value))) {
        return value.toISOString();
      }
      return value;
    },
    {
      toClassOnly: true,
      toPlainOnly: true,
    },
  );
}
