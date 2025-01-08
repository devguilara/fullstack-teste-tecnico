"use client";

import { login } from "../api/auth/login";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "./components/input";
import Label from "./components/label";
import { successToast } from "./components/toast";
import { useAuth } from "./context/AuthContext";

const Login = () => {
  const { updateAuth } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    const data = await login({ email, password });

    if (data) {
      updateAuth({ token: data.token });
      router.push("/home");
      successToast("Usuário logado com sucesso.");
    }

    setLoading(false);
  };
  
  return (
    <section className="flex h-screen bg-gradient-to-r from-purple-900 via-purple-700 to-blue-600">
      {/* Área da imagem */}
      <div className="hidden lg:flex w-1/2 items-center justify-center">
        <img src="/img/sistemas-web.svg" alt="Login illustration" width="600" height="600" />
      </div>

      {/* Área do formulário */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-8">
        <div className="w-full rounded-lg shadow-lg bg-gradient-to-r from-gray-800 via-gray-900 to-black sm:max-w-md p-8">
          <h1 className="text-3xl text-center font-extrabold leading-tight tracking-tight text-white mb-8">
            Entre na sua conta
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label text="Email" htmlFor="email" />
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@email.com"
                required
                className="bg-gray-800 text-white border border-gray-700 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <Label text="Senha" htmlFor="password" />
              <Input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-gray-800 text-white border border-gray-700 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <button
              type="submit"
              className={`flex w-full justify-center rounded-md bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-3 text-sm font-bold text-white shadow-lg transform hover:scale-105 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
            <p className="text-sm text-center text-gray-400">
              Não tem uma conta ainda?
              <Link
                href="/register"
                className="font-medium text-purple-400 hover:underline ml-2"
              >
                Registrar
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
