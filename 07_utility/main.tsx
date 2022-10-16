/**********************************************************************/
//  READONLY - делает все поля объекта только для чтения
type Task = Readonly<{
  id: number;
  text: string;
  isCompleted?: boolean;
  completedDate?: Date | undefined;
}>;

const task: Task = {
  id: 0,
  text: "Some text",
};

/**********************************************************************/
// PARTIAL - делает поля объекта опциональными
type Task1 = {
  id: number;
  text: string;
  isCompleted?: boolean;
  completedDate?: Date | undefined;
};

const task1111: Task1 = {
  id: 0,
  text: "Some text",
  isCompleted: true,
};

type OptionalTask = Partial<Task1>;

const update = (task: Task1, patch: Partial<Task1>): Task1 => {
  return {
    ...task,
    ...patch,
  };
};

update(task1111, { isCompleted: true });

/**********************************************************************/
// REQUIRED - делает все поля объекта обязательными
type Req = Required<{
  id: number;
  text?: string;
}>;

const pro: Req = {
  id: 15,
  text: "somehingf",
};

/**********************************************************************/
// PICK - предназначен для фильтрации ключей объекта
// Первый параметр - объект, из которого нужны выбрать поля
// Второй парамент - список полей, которые нужно выбрать
type UserShemaType = {
  username: string;
  email: string;
  bio: string;
  image: string;
  hash: string;
  salt: string;
  id: string;
};

type PubliUserFiels = Pick<UserShemaType, "hash" | "image" | "username">;

/**********************************************************************/
// OMIT - предназначен для удаления ненужных ключей из объекта
type PubliUserFiels2 = Omit<UserShemaType, "username" | "salt">;

/**********************************************************************/
// RECORD - предназначен для динамического конструирования объектов "налету"
// Первый параметр - описывает тип ключей объекта
// Второй параметр - тип значений объекта
type Obj = Record<string, string>;
type SomeOBj = Record<"A" | "B" | "C", string | number>;

const elems: SomeOBj = {
  A: 15,
  B: "some text",
  C: "true",
};

/**********************************************************************/
// EXCLUDE - исключает из первого типа признаки (ключи), присущие второму типу
type UserShema = {
  username: string;
  email: string;
  bio: string;
  image: string;
  hash: string;
  salt: string;
  id: string;
};
type SomeShema = {
  id: string;
  label: "some";
  writer: false;
};

type PublickFields = Exclude<keyof UserShema, "hash" | "salt">;

/**********************************************************************/
// EXTRACT - вычисляет общие для двух типов признаки (ключи)
type Intersection = Extract<"id" | "name", "name">;
type CommonShema = Extract<keyof UserShema, keyof SomeShema>;

/**********************************************************************/
// NONNULLABLE - удаляет типы null и undefined
type Tn = NonNullable<string | null | undefined>;

/**********************************************************************/
// RETURNTYPE позволяет получить тип возвращаемого значения
function getInt(n: string) {
  return parseInt(n);
}

type TR = ReturnType<typeof getInt>;

const createTask = () => {
  return {
    id: 1,
    text: "Some text",
  };
};

type CreateTaskResult = ReturnType<typeof createTask>;

/**********************************************************************/
// PARAMETERS - получить типы параметров функци
type Input = Parameters<typeof getInt>;

/**********************************************************************/
// CONSTRUCTORPARAMETERS - получаем типы конструктора
class Person {
  constructor(
    public name: string,
    public surname: string,
    public age: number
  ) {}
}

type ConstrInp = ConstructorParameters<typeof Person>;

/**********************************************************************/
// AWAITED - позволяет получать тип результата выполнения промисов
declare function fetch(): Promise<string>;
type FetchResult = Awaited<ReturnType<typeof fetch>>;

/**********************************************************************/
// Uppercase | Lowercase | Capitalize | Uncapitalize - типы для внутренней манипуляции строками
type UpperT = Uppercase<string>;
type LowerT = Lowercase<string>;

let upper: UpperT = "GKFGJHKJ";
let lower: LowerT = "fsdfdsfd";
