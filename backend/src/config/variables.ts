import packageJson from "../../package.json";
import { config } from "dotenv";

config({ override: true });

const requiredVariables = ["JWT_SECRET"];
const missingVariables: string[] = [];

// Validação de variáveis obrigatórias
requiredVariables.forEach((key) => {
  if (!process.env[key]) {
    missingVariables.push(key);
  }
});

if (missingVariables.length > 0) {
  console.error(`Sem variaveis de ambiente: ${missingVariables.join(", ")}`);
  throw new Error("Variaveis de ambiente inválidas");
}

// Definição das variáveis de ambiente com valores padrão, se necessário
export const env = {
  API_NAME: process.env.API_NAME || "backend",
  API_PORT: Number(process.env.API_PORT) || 3333,
  JWT_SECRET: process.env.JWT_SECRET!,
};
