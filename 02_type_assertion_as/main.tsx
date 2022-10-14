// Тип данных, который в будущем не известен (позволяет компилятору знать тип переменной)
let value: unknown;
const s = (value as string).toUpperCase();

/**********************************************************************/
// Пример данных, которые воможно будут добавленны позже
interface UserData {
  name: string;
  surname: string;
  age: number;
}

const user: UserData = {} as UserData;
user.name = "Dzmitry";
user.surname = "Hlushak";

/**********************************************************************/
// Утверждение типа в преобразованиях данных
const person = {
  name: "Dzmitry",
  surname: "Hlushak",
};

const keys = Object.keys(person) as Array<keyof typeof person>;
keys.forEach((k) => {
  person[k];
});

/**********************************************************************/
// Использование Type Assertion в DOM преобразованиии
const element = document.querySelector("#inp") as HTMLInputElement;

/**********************************************************************/
// Работа с различными типами данных при объединении типов
type ErrorMessage = string | string[] | Error;
const apiError: ErrorMessage = JSON.parse(JSON.stringify("[]"));
const formattedMessages = (apiError as string[]).map((e) => e.toUpperCase());

/**********************************************************************/
// Ограничение типа текущим значением с помощью утверждения CONST
const test = {
  name: "User",
  age: 20,
} as const;

type U = typeof test;

// Ограничение типа текущим значением с помощью утверждения CONST
// Значения получатся только для чтения и их нельзя изменять
const months = ["January", "February", "March"] as const;
type M = typeof months;
