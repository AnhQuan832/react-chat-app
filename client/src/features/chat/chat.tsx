import { useAppSelector } from "@/app/hook";
import React from "react";

export const Chat = () => {
  const userInfo = useAppSelector((state) => state.user);
  return (
    <div>
      <p>ID: {userInfo.user.id}</p>
      <p>Name: {userInfo.user.name}</p>
      <p>Email: {userInfo.user.email}</p>
      {userInfo.user.image && (
        <img src={userInfo.user.image} alt="User Image" />
      )}
      <p>Token: {userInfo.user.token}</p>
    </div>
  );
};
