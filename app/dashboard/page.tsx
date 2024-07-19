import { auth } from "@clerk/nextjs/server";
import React from "react";

function DashboardPage() {
  const { userId } = auth();
  return <div>DashboardPage</div>;
}

export default DashboardPage;
