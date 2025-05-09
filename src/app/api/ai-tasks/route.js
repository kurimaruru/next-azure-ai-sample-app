import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const endpoint = process.env.REACT_APP_AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.REACT_APP_AZURE_OPENAI_KEY;

    if (!endpoint || !apiKey) {
      console.error('環境変数が設定されていません:', {
        endpoint: !!endpoint,
        apiKey: !!apiKey,
      });
      return NextResponse.json(
        {
          error:
            '環境変数の設定が不足しています。サーバー管理者にお問い合わせください。',
        },
        { status: 500 }
      );
    }
    const { prompt, tasks } = await request.json();

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: 'あなたはタスク管理の専門家です。' },
          {
            role: 'user',
            content: `
              あなたはタスク管理マネージャーです。
              「# ユーザーの指示」に回答する際に「# タスク一覧」をもとに回答を生成してください。
              タスク一覧が持つ情報については以下の通りになります。
              # タスク情報
              - id: タスクのIDで、タスクごとに一意になる
              - title: タスクのタイトル
              - description: タスクの詳細説明
              - dueDate: タスクの期限日
              - completed: タスクの完了状況
              
              # タスク一覧
              - ${JSON.stringify(tasks)}

              # ユーザーの指示
              ${prompt}
            `,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json({ result: data.choices[0].message.content });
  } catch (error) {
    console.error('Azure OpenAI API error:', error);
    return NextResponse.json(
      { error: 'エラーが発生しました。もう一度お試しください。' },
      { status: 500 }
    );
  }
}
