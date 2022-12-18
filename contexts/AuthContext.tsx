import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export type Subject = {
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
  ELECTIVE_SELECTIONS?: any;
};

type AuthContextType = {
  user: UserType | undefined;
  setUser: (userData: UserType) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  setUser(userData: UserType) {},
  logout() {},
  loading: true,
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

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const _id = localStorage.getItem("_id");
    if (_id) {
      fetch("/api/students/fetch-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: _id }),
      })
        .then((response) => response.json())
        .then((data) => {
          setUser({ ...data.data });
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const setUserData = (userData: UserType) => {
    setUser({ ...userData });
  };

  const logout = () => {
    localStorage.removeItem("_id");
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
    router.replace("/");
  };

  const context = {
    user,
    setUser: setUserData,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
