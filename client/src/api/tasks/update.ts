const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const updateTask = async (
  fields: {
    description: string;
    finishedAt?: string;
    status: string;
    title: string;
  },
  token?: string,
  taskId?: string
) => {
  const { description, finishedAt, status, title } = fields;

  try {
    await fetch(`${apiUrl}/task/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        description,
        ...(finishedAt && { finishedAt: new Date(finishedAt).toISOString() }),
        status,
        title,
      }),
    });

    alert("Task alterada com sucesso.");
  } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Erro ao processar a requisição. Tente novamente.");
  }
};
