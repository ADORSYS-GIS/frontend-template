import * as React from "react";

import ViteLogo from "./logos/vite.svg";
import ReactLogo from "./logos/react.svg";
import TSLogo from "./logos/ts.svg";
import PWALogo from "./logos/pwa.svg";
import MuiLogo from "./logos/mui.svg";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex items-center justify-center gap-8">
        <img src={ViteLogo} alt="Vite" className="h-32 w-32" />
        <img src={TSLogo} alt="TypeScript" className="h-32 w-32" />
        <img
          src={ReactLogo}
          alt="React"
          className="h-96 w-96 animate-spin-slow"
        />
        <img src={MuiLogo} alt="Mui" className="h-32 w-32" />
        <img src={PWALogo} alt="PWA" className="h-32 w-32" />
      </div>
    </div>
  );
};

export default HomePage;
