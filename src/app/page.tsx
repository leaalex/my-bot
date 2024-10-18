'use client'
import { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        const setWebhook = async () => {
            const res = await fetch('/api/webhook', {
                method: 'POST',
                body: JSON.stringify({ action: 'setWebhook' }),
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(await res.json());
        };

        setWebhook();
    }, []);

    return <div>Bot is running...</div>;
}
