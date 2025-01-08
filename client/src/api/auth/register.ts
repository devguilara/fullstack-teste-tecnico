const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const register = async (fields: {
  email: string;
  password: string;
  name: string;
}): Promise<void> => {
  if (!apiUrl) {
    console.error("A variável NEXT_PUBLIC_API_URL não está configurada.");
    throw new Error("Erro de configuração: URL da API não definida.");
  }

  try {
    const response = await fetch(`${apiUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Erro ao registrar usuário:", errorDetails);
      throw new Error(errorDetails.message || "Falha ao registrar.");
    }

    console.log("Usuário registrado com sucesso.");
  } catch (error: any) {
    console.error("Erro na requisição:", error.message || error);
    throw error;
  }
};
