import React from "react";
import { RootStore } from "./client/Models/RootStore";

const rootStore = RootStore.create();
export const Context = React.createContext(rootStore);