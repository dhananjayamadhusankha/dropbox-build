"use client";

import Dropzone from "@/components/Dropzone";
import { useAuth } from "@clerk/nextjs";
import React from "react";

function DashboardPage() {
  const {userId} = useAuth();
  return (
    <div>
      <Dropzone />
    </div>
  );
}

export default DashboardPage;
