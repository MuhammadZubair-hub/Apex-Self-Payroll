// import { LightColors } from "./colors/light";
// import { DarkColors } from "./colors/dark";

import { useSelector } from "react-redux";
import { DarkColors } from "./dark";
import { LightColors } from "./light";

export const getThemeColors = (theme: "light" | "dark") => {

  console.log("theme fettig in colors are",theme);
  return theme === "dark" ? DarkColors : LightColors;
};
