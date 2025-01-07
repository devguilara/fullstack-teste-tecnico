"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../components/button";
import { useAuth } from "../context/AuthContext";
import { Task } from "../types/task";
import { ModalAddTask } from "./components/modal-add-task";
import { ModalDeleteTask } from "./components/modal-delete-task";
import { ModalEditTask } from "./components/modal-edit-task";
import { TableTasks } from "./components/table-tasks";
import { createTask } from "../../api/tasks/create";
import { deleteTask } from "../../api/tasks/delete";
import { listTasks } from "../../api/tasks/list";
import { updateTask } from "../../api/tasks/update";
import withAuth from "../components/withAuth";

// Função para inicializar os campos
const getInitialFields = () => ({
  title: "",
  description: "",
  status: "pendente",
  finishedAt: "",
});

const Home = () => {
  const { auth } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [fields, setFields] = useState(getInitialFields);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Modais
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  // Função para buscar tarefas
  const fetchTasks = async () => {
    if (auth?.token) {
      const data = await listTasks(auth?.token);
      setTasks(data);
    }
  };


  useEffect(() => {
    if (auth?.token) fetchTasks();
  }, [auth?.token]);

  // Manipuladores de eventos
  const handleAddTask = async () => {
    if (auth?.token) {
      await createTask(fields, auth?.token);
      setIsOpenAddModal(false);
      setFields(getInitialFields());
      fetchTasks();
    }
  };

  const handleEditTask = async () => {
    if (auth?.token && selectedTask?.id) {
      await updateTask(fields, auth?.token, selectedTask.id);
      setIsOpenEditModal(false);
      setFields(getInitialFields());
      fetchTasks();
    }
  };

  const handleDeleteTask = async () => {
    if (auth?.token && selectedTask?.id) {
      await deleteTask(auth?.token, selectedTask.id);
      setIsOpenDeleteModal(false);
      fetchTasks();
    }
  };

  return (
    <section className="container mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-semibold text-white">Lista de Tarefas</h1>
          <Button
                className="flex items-center bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700 focus:outline-none transition duration-300"
                onClick={() => setIsOpenAddModal(true)}
              >
            <Plus className="mr-2" size={25} />
            Adicionar Nova Tarefa
          </Button>
        </div>
      </div>

      <div>
        {tasks.length > 0 ? (
          <TableTasks
            tasks={tasks}
            setIsOpenDeleteModal={setIsOpenDeleteModal}
            setIsOpenEditModal={setIsOpenEditModal}
            setSelectedTask={setSelectedTask}
          />
        ) : (
          <p className="text-center font-semibold text-gray-600">
            Sem tarefas por enquanto...
          </p>
        )}
      </div>

      {/* Modais */}
      {isOpenAddModal && (
        <ModalAddTask
          fields={fields}
          setFields={setFields}
          handleSubmit={handleAddTask}
          setIsOpenModal={setIsOpenAddModal}
        />
      )}

      {isOpenEditModal && (
        <ModalEditTask
          fields={fields}
          setFields={setFields}
          handleSubmit={handleEditTask}
          setIsOpenModal={setIsOpenEditModal}
          task={selectedTask}
        />
      )}

      {isOpenDeleteModal && (
        <ModalDeleteTask
          handleDelete={handleDeleteTask}
          setIsOpenModal={setIsOpenDeleteModal}
        />
      )}
    </section>
  );
};

export default withAuth(Home);
