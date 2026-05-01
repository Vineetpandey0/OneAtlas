"use client";

import { useAuth, SignIn } from "@clerk/nextjs";
import axios from "axios";
import { useAppStore } from "../../store/appStore";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn, isLoaded } = useAuth();
  const { appData, setAppData } = useAppStore();

  if (!isLoaded) return null;

  if(isSignedIn && appData.length === 0) {
    try {
      const fetchAppsData = async () => {
        const res = await axios.get("/api/app/get-apps");
        console.log(res.data);
        setAppData(res.data);
      };
      fetchAppsData();
    } catch (error) {
      console.error("Error fetching apps data from db:", error);
    }
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SignIn />
      </div>
    );
  }

  return <>{children}</>;
}