// hooks/useAiTask.js
export const useAiTask = (setResult, setIsLoading) => {
    // Next.jsのAPIルートを呼び出す関数
    const DescriptionTaskByAi = async (prompt, tasks) => {
      setIsLoading(true);
  
      try {
        // 内部APIルートを呼び出す
        const response = await fetch('/api/ai-tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt,
            tasks,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
  
        const data = await response.json();
        setResult(data.result);
      } catch (error) {
        console.error('API error:', error);
        setResult('エラーが発生しました。もう一度お試しください。');
      } finally {
        setIsLoading(false);
      }
    };
  
    return { DescriptionTaskByAi };
  };
  