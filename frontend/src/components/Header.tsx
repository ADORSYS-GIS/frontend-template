import * as React from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Icons } from "./icons";
import { buttonVariants } from "./ui/buttonVariants";

export const Header: React.FC = () => {
  return (
    <header className="p-4 flex justify-between items-center text-bright-blue">
      <div className="flex items-center gap-4">
        <button
          className={buttonVariants({ variant: "ghost", size: "icon" })}
          title="Open menu"
        >
          <Icons.menu className="h-8 w-8" />
        </button>
        <h1 className="text-xl font-bold">REACT PWA</h1>
      </div>
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <a
          href="https://github.com/your-github-link"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <Icons.github className="h-8 w-8" />
        </a>
        <ThemeSwitcher />
      </div>
    </header>
  );
};
