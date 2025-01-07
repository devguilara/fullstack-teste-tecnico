const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const listTasks = async (token?: string) => {
  if (!token) {
    console.error("Erro: Token é necessário para a requisição.");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/task`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(`Erro na requisição: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
};
