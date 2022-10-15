// Условные типы , Infer
// Простой пример пренадлежности типа
type Test<T> = T extends string ? true : false;
type STRING_T = Test<"some text">;
type NUMBER_T = Test<15>;

/**********************************************************************/
// Функция, которая возвращает id объекта с разными типами (стока или число)
interface User {
  id: string;
}
interface Message {
  id: number;
}

function getId<T extends { id: any }>(
  obj: T
): T extends { id: string } ? string : number {
  return obj.id;
}

const r1 = getId({} as User);
const r2 = getId({} as Message);

/**********************************************************************/
// Исключение определенных типов из выражений
type NotFalsy<T = null> = T extends null | undefined | false | 0 ? never : T;
let r: NotFalsy<string>;

/**********************************************************************/
// Фильтрация типов
type Filter<T, U> = T extends U ? never : T;
type R = Filter<"a" | "b" | "c", "c">;

/**********************************************************************/
// Пример выше это аналогия втроенного типа в TypeScript - Exclude
type R2 = Exclude<"a" | "b" | "c", "c">;

/**********************************************************************/
// Функция возвращающая неизвестный нам тип
function test() {
  return 15;
}

type FunctionResult<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;

type RR = FunctionResult<typeof test>;

// Предыдущая функция это аналогия утилитного типа ReturnType
type RRR = ReturnType<typeof test>;
