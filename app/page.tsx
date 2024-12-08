"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function Content() {
    const searchParams = useSearchParams();
    const data = searchParams.get("data");

    return <p>Data: {data}</p>;
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
