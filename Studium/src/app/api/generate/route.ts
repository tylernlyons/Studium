import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { term } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'API key not set' }, { status: 500 });
    }

    const APIBody = {
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: 'You are a helpful assistant that defines terms concisely.' },
            { role: 'user', content: `Define the following term in around 10 words: ${term}` }
        ],
        temperature: 0.5,
        max_tokens: 30
    };

    try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(APIBody),
        });

        const data = await res.json();
        const definition = data.choices?.[0]?.message?.content?.trim() || 'Definition not found.';

        return NextResponse.json({ definition });
    } catch (err) {
        console.error('OpenAI fetch failed:', err);
        return NextResponse.json({ error: 'Failed to generate definition' }, { status: 500 });
    }
}
