"use client"
import { useSocketStore } from "@/store/useSocketStore";
import { Loader2 } from "lucide-react";
import React from "react";

const HomePageLoader = () => {
    const { waitingForMessage } = useSocketStore();
	return waitingForMessage && (
		<div className="fixed inset-0 top-0 left-0 z-50 flex justify-center items-center bg-black/50">
			<Loader2 className="animate-spin" color="white" />
		</div>
	);
};

export default HomePageLoader;
