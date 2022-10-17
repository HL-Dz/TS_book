import React, {
  FC,
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  useCallback,
  useReducer,
  Component,
  CSSProperties,
} from "react";
// Типизация JSX элемента
const title: React.ReactElement = <h1>React+ TypeScript</h1>;
function App() {
  return <div>{title}</div>;
}

/**********************************************************************/
// Типизация функционального React компонента
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
// Типизация классового компонента
type CounterState = {
  count: number;
};
type CounterProps = {
  title?: string;
};
class Counter extends Component<CounterProps, CounterState> {
  state: { count: number };
  setState: any;
  props: any;
  constructor(props: CounterProps) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  static defaultProps: CounterProps = {
    title: "Default counter: ",
  };

  static getDerivedStateFromProps(
    props: CounterProps,
    state: CounterState
  ): CounterState | null {
    return false ? { count: 2 } : null;
  }

  componentDidMount(): void {}

  shouldComponentUpdate(
    nextProps: CounterProps,
    nextState: CounterState
  ): boolean {
    return true;
  }

  handleClick = () => {
    this.setState(({ count }) => ({
      count: ++count,
    }));
  };

  render() {
    return (
      <div>
        <h1>
          {this.props.title}
          {this.state.count}
        </h1>
        <button onClick={this.handleClick}>+1</button>
      </div>
    );
  }
}

/**********************************************************************/
// Типизация событий
class Form extends Component<{}, {}> {
  handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log(e.currentTarget);
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted!");
  };

  handleCopy = (e: React.ClipboardEvent<HTMLInputElement>) => {
    console.log("Coppied!");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Simple text:
          <input
            onFocus={this.handleFocus}
            onCopy={this.handleCopy}
            type="text"
            name="text"
          />
          <button type="submit">Submit</button>
        </label>
      </form>
    );
  }
}

const App34: React.FC = () => <Form />;

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
  const ref = useRef<HTMLDivElement | null>(null);

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
// Типизация useReducer()
interface State {
  count: number;
}
type Action = { type: "increment" | "decrement" };
const counterReducer = ({ count }: State, { type }: Action) => {
  switch (type) {
    case "increment":
      return { count: count + 1 };
    case "decrement":
      return { count: count - 1 };
    default:
      return {};
  }
};
const [state, dispatch] = useReducer(counterReducer, { count: 0 });
dispatch({ type: "increment" });
dispatch({ type: "decrement" });

/**********************************************************************/
// Типизация useContext(), createContext(), useCallback()
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

/**********************************************************************/
// Типизация css свойств
const styles: CSSProperties = { display: "block", marginBottom: "10px" };
