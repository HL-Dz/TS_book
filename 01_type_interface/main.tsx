// Типы в отличие от интерфейсов не могут быть объявлены несколько раз

/**********************************************************************/
// Определение типов аргумента функции через type
type SumB = (a: number, b: number) => number;
const sumT: SumB = (a, b) => a + b;

/**********************************************************************/
// Определение типов аргумента функции через interface
interface SumA {
  (a: number, b: number): number;
}
const sumI: SumA = (a, b) => a + b;

/**********************************************************************/
// Наследование интерфейса от типа (в новых версиях TypeScript)
type B = {
  name: string;
};

interface A extends B {}

const b: A = {
  name: "Dzmitry",
};

/**********************************************************************/
// Описание кортежа
type State = [number, (n: number) => void];
const s: State = [15, (n) => {}];

/**********************************************************************/
// Тип имплементирует другой тип
type AB = {
  age: number;
};

type BA = {
  name: string;
};

type C = AB | BA;
const obj: C = {
  age: 15,
};