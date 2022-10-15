// Получение ключей из класса
// Оператор keyof выводит только публичные нестатические ключи
class Person {
  name: string = "";
  page: number = 0;
}

let persontField: keyof Person;

/**********************************************************************/
// Объеднинения операторов keyof и typeof
// Найти все ключи из объекта с помощью объединения операторов
const message = {
  id: 1,
  text: "JavaScript",
  isAdmin: true,
  location: {
    country: "Belarus",
    city: "Brest",
  },
};

type MessageKeys = keyof typeof message;

/**********************************************************************/
// Тоже самое, что и примеры выше, но только с использованием Enum
enum Colors {
  white = "#fff",
  black = "#000",
}

type AvailableColors = keyof typeof Colors;

/**********************************************************************/
// Функция фалидации для полей
const formData = {
  id: 1,
  firstName: "Dzmitry",
  surname: "Hlushak",
  age: 31,
  isLocation: "Belarus",
};

declare function validate<T>(data: T): { [key in keyof T]: boolean };
const r = validate<typeof formData>(formData);
