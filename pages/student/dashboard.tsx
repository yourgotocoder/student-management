import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";

type Props = {};

const Dashboard = (props: Props) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    const id = localStorage.getItem("_id");
    if(id === null) {
        router.replace("/")
    }
  }, [])
  return <div>dashboard</div>;
};

export default Dashboard;
