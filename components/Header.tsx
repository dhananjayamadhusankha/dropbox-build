"use client";

import Link from "next/link";
import Image from "next/image";
import DropboxLogo from "../images/dropbox-seeklogo.png";
import { SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { SignedOut } from "@clerk/clerk-react";
import { ThemeToggler } from "./ThemeToggler";
import { Button } from "./ui/button";

function Header() {
  return (
    <header className="flex items-center justify-between px-7 py-4">
      <Link href="/" className="flex items-center space-x-4">
        <div className="bg-dropbox w-fit p-2">
          <Image src={DropboxLogo} alt="dropbox logo" width={30} />
        </div>
        <h1 className="font-bold text-2xl">Dropbox</h1>
      </Link>

      <div className="flex items-center space-x-4 pr-3">
        <ThemeToggler />
        <SignedOut>
          <Button className="bg-dropbox text-base rounded-xl dark:text-white hover:bg-[#0244c7]">
            <SignInButton afterSignInUrl={"/dashboard"} mode={"modal"} />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
}

export default Header;
