import { createContext, useEffect, useState } from "react";

type Subject = {
  TITLE: string;
  CODE: string;
};

type UserType = {
  REGNO: number | undefined;
  NAME: string | undefined;
  CGPA: number | undefined;
  CURRENT_SEM: number | undefined;
  EMAIL_ID: string | undefined;
  DEFAULT_PASSWORD: string | undefined;
  ELECTIVE_1?: Subject;
  ELECTIVE_2?: Subject;
  ELECTIVE_1_OPTIONS?: Subject[];
  ELECTIVE_2_OPTIONS?: Subject[];
  ELECTIVE_4_OPTIONS?: Subject[];
  ELECTIVE_5_OPTIONS?: Subject[];
};

type AuthContextType = {
  user: UserType | undefined;
  login: (regno: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  login(regno: string, password: string) {},
  logout() {},
});

type Props = {
  children: React.ReactNode;
};

export function AuthContextProvider(props: Props) {
  // const [userData, setUserData] = useState<AuthContextType>();
  const [user, setUser] = useState<UserType>({
    REGNO: undefined,
    NAME: undefined,
    CGPA: undefined,
    CURRENT_SEM: undefined,
    EMAIL_ID: undefined,
    DEFAULT_PASSWORD: undefined,
    ELECTIVE_1: undefined,
    ELECTIVE_2: undefined,
    ELECTIVE_1_OPTIONS: undefined,
    ELECTIVE_2_OPTIONS: undefined,
    ELECTIVE_4_OPTIONS: undefined,
    ELECTIVE_5_OPTIONS: undefined,
  });

  const login = async (regno: string, password: string) => {
    await fetch("/api/students/login", {
        method: "POST"
    })
  };

  const logout = () => {
    setUser({
      REGNO: undefined,
      NAME: undefined,
      CGPA: undefined,
      CURRENT_SEM: undefined,
      EMAIL_ID: undefined,
      DEFAULT_PASSWORD: undefined,
      ELECTIVE_1: undefined,
      ELECTIVE_2: undefined,
      ELECTIVE_1_OPTIONS: undefined,
      ELECTIVE_2_OPTIONS: undefined,
      ELECTIVE_4_OPTIONS: undefined,
      ELECTIVE_5_OPTIONS: undefined,
    });
  };

  const context = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
