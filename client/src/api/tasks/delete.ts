const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const deleteTask = async (token?: string, taskId?: string) => {
  try {
    if (!taskId) {
      console.error("Erro: taskId é necessário.");
      return;
    }

    await fetch(`${apiUrl}/task/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    alert("Task deletada com sucesso.");
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
};
