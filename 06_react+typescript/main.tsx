import React, {
  FC,
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
// Типизация JSX элемента
const title: React.ReactElement = <h1>React+ TypeScript</h1>;
function App() {
  return <div>{title}</div>;
}

/**********************************************************************/
// Типизация React компонента
interface Props {
  children: React.ReactNode;
}
const Header: FC<Props> = ({ children }) => {
  return <h1 className="some-class">{children}</h1>;
};

const App1 = () => {
  return (
    <div>
      <Header>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Header>
    </div>
  );
};

/**********************************************************************/
// Типизация кастомного компонента input-a и обработчика
const CustomInput = (props: React.HTMLProps<HTMLInputElement>) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <input
      onChange={onChangeHandler}
      placeholder="Custom Input"
      className="my-input"
      {...props}
    />
  );
};
const App2 = () => {
  return (
    <div>
      <CustomInput type="text" />
    </div>
  );
};

/**********************************************************************/
// Типизация хука useState()
interface IUser555 {
  name: string;
  surname: string;
  isAdmin: boolean;
  location: string;
}
const [value, setValue] = useState<IUser555 | null>(null); // useState() первый пример

/**********************************************************************/
// Типизация хука useRef()
const Hook = () => {
  const ref = useRef<HTMLDivElement>(null);

  return <div ref={ref}>Some text</div>;
};

const Hook2 = () => {
  const value = useRef<number>(0);

  useEffect(() => {
    setInterval(() => {
      value.current += 1;
    }, 100);
  }, []);

  return <div ref={value}>Some text</div>;
};

/**********************************************************************/
// Типизация useContext(), createContext(), useCallbalc()
interface ITheme {
  color: string;
  background: string;
}
type AvailableThemes = "light" | "dark";

const themes: Record<AvailableThemes, ITheme> = {
  light: {
    color: "#000",
    background: "#eee",
  },
  dark: {
    color: "#553",
    background: "#543",
  },
};

const ThemeContext = createContext({
  theme: themes.light,
  toggle: () => {},
});

const ThemeProvider: FC = ({ children }) => {
  const [currentTheme, setCurrentTHeme] = useState<AvailableThemes>("dark");

  const toggle = useCallback<() => void>(() => {
    setCurrentTHeme(currentTheme === "dark" ? "ligth" : "dark");
  }, [currentTheme]);
  return (
    <ThemeContext.Provider
      value={{
        toggle,
        theme: themes[currentTheme],
      }}
    ></ThemeContext.Provider>
  );
};
const HookContext = () => {
  const { theme, toggle } = useContext(ThemeContext);

  return <button style={{ background: theme.background }}>some button</button>;
};

const App3 = () => {
  return (
    <div>
      <ThemeProvider>
        <HookContext />
      </ThemeProvider>
    </div>
  );
};
