import { useSearchParams } from 'next/navigation';

export default function HomePage() {
    const searchParams = useSearchParams();
    const data = searchParams.get('data');

    return (
        <div>
            <h1>Welcome to the Mini App</h1>
            <p>Data: {data}</p>
        </div>
    );
}
