import React from "react";
import { BsFill } from "react";
import "../MainFeed/InputOptions.css";

const InputOptions = ({ title, SVGs, Icon, color }) => {
  return (
    <div className="inputOptions">
     { Icon ? <Icon style={{ color: color, marginTop:"5px", padding:"0px" }} />:
      SVGs }
      <h4 className="inputOptionsText pt-1">{title}</h4>
    </div>
  );
};

export default InputOptions;
