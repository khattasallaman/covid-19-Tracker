import React from "react";

import useWindowDimensions from "./size";


const Footer = () => {
    const { width } = useWindowDimensions();
  return (
    <div>
      <div className={width < 700 ? "footer-small-screen" : "footer-style"}>© Khattab Abdalwahab ©</div>
    </div>
  );
};

export default Footer;
