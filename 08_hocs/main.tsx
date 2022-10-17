import React, { useState } from "react";
/**********************************************************************/
// Типизация HOC-а

type BaseProps = {
  primTitle: string;
  secTitle?: string;
};

type InjectedProps = {
  toggleStatus: Boolean;
  toggle: () => void;
};

const Button = ({ primTitle, secTitle, toggle, toggleStatus }: any) => (
  <button onClick={toggle}>{toggleStatus ? primTitle : secTitle}</button>
);

const withToggle = <BaseProps extends InjectedProps>(
  PassedComponent: React.ComponentType<BaseProps>
) => {
  return (props: BaseProps) => {
    const [toggleStatus, toggle] = useState(false);

    return (
      <PassedComponent
        {...(props as BaseProps)}
        toggle={() => toggle(!toggleStatus)}
        toggleStatus={toggleStatus}
      />
    );
  };
};

const ToogleButton = withToggle(Button);
