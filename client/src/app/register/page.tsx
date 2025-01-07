"use client";

import { register } from "../../api/auth/register";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "../components/input";
import Label from "../components/label";
import { successToast } from "../components/toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await register({ email, name, password });
      successToast("Usuário registrado com sucesso.");
      router.push("/");
    } catch (err: any) {
      setError(err.message);
      console.error("Erro ao registrar:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex h-screen bg-gradient-to-r from-purple-900 via-purple-700 to-blue-600">
      {/* Área do formulário */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-8">
        <div className="w-full rounded-lg shadow-lg bg-gradient-to-r from-gray-800 via-gray-900 to-black sm:max-w-md p-8">
          <h1 className="text-3xl text-center font-extrabold leading-tight tracking-tight text-white mb-8">
            Crie sua conta
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name" text="Nome" />
              <Input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                required
                className="bg-gray-800 text-white border border-gray-700 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <Label htmlFor="email" text="Email" />
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
              <Label htmlFor="password" text="Senha" />
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
              {loading ? "Criando conta..." : "Registrar"}
            </button>
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
          </form>
        </div>
      </div>

      {/* Área da imagem */}
      <div className="hidden lg:flex w-1/2 items-center justify-center">
        <Image
          src="/img/cadastro.png"
          alt="Registro illustration"
          width={600}
          height={600}
          className="object-contain rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default Register;
