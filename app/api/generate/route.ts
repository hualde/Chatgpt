import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const body = await req.json()
  const { prompt } = body

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ],
      model: "gpt-4o-mini",
    })

    const result = completion.choices[0].message.content

    return NextResponse.json({ result: result })
  } catch (error) {
    console.error('OpenAI API error:', error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}