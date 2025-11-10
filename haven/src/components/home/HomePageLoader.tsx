"use client"
import { useSocketStore } from "@/store/useSocketStore";
import React from "react";
import { HashLoader } from "react-spinners";

const HomePageLoader = () => {
    const { waitingForMessage } = useSocketStore();
	return waitingForMessage && (
		<div className="fixed inset-0 top-0 left-0 z-50 flex justify-center items-center bg-black/50">
			<HashLoader />
		</div>
	);
};

export default HomePageLoader;
