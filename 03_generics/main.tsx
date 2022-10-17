// Generics (Обобщения) в TypeScript
// Примеры создания Дженериков

interface State<T, U, V, K> {}

type State2<T> = {};

class State3<T> {}

function state4<T>() {}

/**********************************************************************/
// Создание дженерики через спомощью функции
function getInfo<T>(arg: T): T {
  return arg;
}

getInfo<number>(15);
getInfo<string>("some text");
getInfo<boolean>(false);
getInfo({ name: "Dzmitry", surname: "Hlushak" });

/**********************************************************************/
// Созадние общего интерфейса State
interface IUser {
  name: string;
  age: number;
}

interface IMessage {
  id: number;
  text: string;
}

interface State1<T> {
  loading: boolean;
  error: Error | null;
  data: T;
}

type UserState = State1<IUser>;
type MessagState = State1<IMessage>;

const messageState: MessagState = {
  loading: false,
  error: null,
  data: {
    id: 12,
    text: "some text",
  },
};

const userState: State1<IUser> = {
  loading: true,
  error: null,
  data: {
    age: 15,
    name: "Dzmitry",
  },
};

/**********************************************************************/
// Функция, которая возвращает два "смерженных" объекта
function merge<U, V>(o1: U, o2: V): U & V {
  return {
    ...o1,
    ...o2,
  };
}

merge({ a: "First" }, { b: "Second" });

/**********************************************************************/
// Асинхронная функция, возвращающая промис
async function fakeRequest() {
  return 2;
}

const b: Promise<number> = fakeRequest();

/**********************************************************************/
// Дженерик для создания объекта
type Obj = {
  [propName: string]: string | number;
};

const user: Obj = {
  name: "Alex",
  surname: "Smith",
  age: 31,
};

/**********************************************************************/
// Дженерик для создания объекта (аналогично предыдущему примеру) с помощью Record
type Obj2 = Record<string, string | number>;
const user2: Obj2 = {
  name: "Alex",
  surname: "Smith",
  age: 31,
};

/**********************************************************************/
// Ограничение в дженерике с помощью свойства length для массива
// Для типов данных у которых есть свойство length (массивы, строки)
const len = <T extends { length: number }>(collection: T) => {};
len("some text");
len([1, 2, 3, 4]);

/**********************************************************************/
// Создание класса для работы с разными коллекциями
class DataCollection<T extends { id: string }> {
  constructor(public data: T[]) {}
  search(id: string): T | null {
    return this.data.find((el) => el.id === id) || null;
  }
}

type IUser777 = {
  id: string;
  name: string;
};

type Message = {
  id: string;
  text: string;
};

const arr: Array<IUser777> = [
  {
    id: "1",
    name: "Dzmitry",
  },
  {
    id: "2",
    name: "Alex",
  },
  {
    id: "3",
    name: "John",
  },
];

const users = new DataCollection(arr);
users.search("1");

const message: Message = {
  id: "1",
  text: "Some text",
};

const messages = new DataCollection([message]);
messages.search("1");

/**********************************************************************/
// Функция, которая возвращает значение свойства
const getValue = <T extends object, U extends keyof T>(obj: T, prop: U) => {
  return obj[prop];
};

const r = getValue(
  {
    name: "Dzmitry",
    surname: "Hlushak",
    age: 31,
    location: "Brest",
    isAdmin: true,
  },
  "isAdmin"
);

/**********************************************************************/
// Функция, которая возвращает массив ключей объекта
const getKey = <T extends object, U extends keyof T>(
  obj: T,
  value: T[U]
): Array<U> | [] => {
  const arr = (Object.keys(obj) as Array<U>).filter((k) => obj[k] === value);
  return arr || [];
};

const key = getKey(
  {
    name: "Dzmitry",
    isAdmin: true,
  },
  true
);

/**********************************************************************/
// Функция, в которой значение свойства объекта можно менять только на такой же тип значения
const pathField = <T extends object, U extends keyof T, V extends T[U]>(
  obj: T,
  field: U,
  val: V
): T => {
  const copyObj = { ...obj };
  copyObj[field] = val;
  return copyObj;
};
pathField({ name: "Dzmitry" }, "name", "Alex");

/**********************************************************************/
// Функция с указанием для параметров типа значения по умолчанию
function format<T = string>(s?: T): T | undefined {
  return s;
}
format();

/**********************************************************************/
// Создание типа наподобие React.FC
type FunctionComponent<T extends object = object> = (
  props: T & { childrent: any }
) => any;
const component: FunctionComponent<{ name: string; age: number }> = ({
  name,
  age,
}) => {};

/**********************************************************************/
// Получить значение из вложенного объекта (двухуровнего)
const menu = {
  analytics: {
    bussines: "Для бизнеса",
    data: "Big Data",
  },
  design: {
    graphical: "Graphic",
  },
};

const getMenu = <T extends object, L1 extends keyof T, L2 extends keyof T[L1]>(
  obj: T,
  l1: L1,
  l2: L2
) => {
  return obj[l1][l2];
};

console.log(getMenu(menu, "analytics", "bussines"));
