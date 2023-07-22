import React from "react";
import A from "../../common/assets";
import Link from "../../components/MUIComponent/Link";

const GoBack = (props) => {
  return (
    <Link href={props.url} color={A.colors.black}>
      <i class="fa-solid fa-arrow-left fa-xl"></i>
    </Link>
  );
};
export default GoBack;
