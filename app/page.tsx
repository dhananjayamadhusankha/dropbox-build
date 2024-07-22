import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { bricolage_grotesque } from "./fonts";

export default function Home() {
  return (
    <main className=" ">
      <div className="flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800">
        <div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-2 2xl:w-4/12 w-auto">
          <h1 className={`text-5xl pb-5 ${bricolage_grotesque.className}`}>
            Welcome to Dropbox.
            <br />
            <br />
            Everything you and your business need to work efficiently, all in
            one place
          </h1>
          <p className="pb-20">
            Collaborate seamlessly and deliver work faster from anywhere with
            Dropbox. Securely store your content, edit PDFs, share videos, sign
            documents and track file engagement—without leaving Dropbox.
          </p>
          <Link
            href="/dashboard"
            className="flex items-center bg-[#3984FF] p-7 w-fit rounded-3xl text-blue-950 font-semibold text-lg"
          >
            Try it for free! <ArrowRight className="ml-10" />
          </Link>
        </div>

        <div className="bg-[#11919] dark:bg-slate-800 h-full p-10 2xl:w-8/12 w-auto">
          <video autoPlay muted loop className="rounded-lg">
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div
        className={`text-center p-6 bg-[#f7f5f2] text-slate-900 ${bricolage_grotesque.className}`}
      >
        <p className={`font-normal pt-5 text-3xl sm:text-4xl`}>
          All the tools you need in one plan
        </p>
        <p className="text-base p-2">
          Store and share files. Sign and send documents. Record screens and
          comment. All in one place.
        </p>
      </div>
    </main>
  );
}
