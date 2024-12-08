"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function Content() {
    const searchParams = useSearchParams();
    const data = searchParams.get("data"); // Fetch the "data" parameter from the URL

    return <p>Data: {data}</p>; // Display the data
}

export default function HomePage() {
    return (
        <div>
            <h1>Welcome to the Mini App</h1>
            <Suspense fallback={<p>Loading data...</p>}>
                <Content />
            </Suspense>
        </div>
    );
}
