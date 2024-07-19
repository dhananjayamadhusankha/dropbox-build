"use client";

import Link from "next/link";
import Image from "next/image";
import DropboxLogo from "../images/dropbox-seeklogo.png";
import { SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { SignedOut } from "@clerk/clerk-react";
import { ThemeToggler } from "./ThemeToggler";

function Header() {
  return (
    <header className="flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <div className="bg-dropbox w-fit p-3">
          <Image src={DropboxLogo} alt="dropbox logo" width={30} />
        </div>
        <h1 className="font-bold text-xl">Dropbox</h1>
      </Link>

      <div>
        <ThemeToggler />
        <SignedOut>
          <SignInButton fallbackRedirectUrl={"/dashboard"} mode={"modal"} />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}

export default Header;
