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
          error: '環境変数の設定が不足しています。サーバー管理者にお問い合わせください。',
        },
        { status: 500 }
      );
    }

    const { prompt } = await request.json();

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        messages: [
          { 
            role: 'system', 
            content: 'あなたはタスク管理の専門家です。タスクは必ずJSON形式で返してください。' 
          },
          {
            role: 'user',
            content: `
              以下の指示に基づいて、タスクをJSON形式で最大5件作成してください。
              タスクは以下の形式で返してください：
              {
                "tasks": [
                  {
                    "title": "タスクのタイトル",
                    "description": "タスクの詳細説明",
                    "dueDate": "YYYY-MM-DD"
                  }
                ]
              }
              
              また、dueDateは必ず本日以降の日付で返してください。本日の日付は${new Date().toISOString().split('T')[0]}です。

              # ユーザーの指示
              ${prompt}
            `,
          },
        ],
        response_format: { "type": "json_object" } ,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    try {
      // AIのレスポンスをJSONとしてパース
      const parsedResponse = JSON.parse(aiResponse);
      return NextResponse.json({ tasks: parsedResponse.tasks });
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return NextResponse.json(
        { error: 'AIのレスポンスの解析に失敗しました。' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Azure OpenAI API error:', error);
    return NextResponse.json(
      { error: 'エラーが発生しました。もう一度お試しください。' },
      { status: 500 }
    );
  }
} 