import * as React from "react";
import { createTheme} from "@mui/material/styles";
import "./CardList.css";
import { ThemeProvider } from "@emotion/react";
import TypoText from "../../components/MUIComponent/TypoText";
import CardInSet from "./CardInSet";
const theme = createTheme({
  typography: {
    fontFamily: "inter, sans-serif",
  },
});

export default function CardList({ counter, term, definition }) {
  return (
    <ThemeProvider theme={theme}>
      <div className="card-row">
        <div className="card-header">
          <TypoText style={{ margin: 0 }} variant="h4">
            1
          </TypoText>
          <div className="card-icons">
            <i class="fa-solid fa-pen-to-square"></i>
            <i class="card-icon fa-solid fa-trash"></i>
          </div>
        </div>

        <div className="card-body">
          <CardInSet />
        </div>
      </div>
    </ThemeProvider>
  );
}
