import { Check, X } from "lucide-react";
import React from "react";
import { Button } from "../../components/button";
import Input from "../../components/input";
import Label from "../../components/label";
import { Modal } from "../../components/modal";
import Select from "../../components/select";
import Textarea from "../../components/textarea";
import { FieldsTask } from "../../types/task";

interface IModalAddTask {
  fields: FieldsTask;
  setFields: (fields: FieldsTask) => void;
  setIsOpenModal: (isOpen: boolean) => void;
  handleSubmit: () => void;
}

export const ModalAddTask: React.FC<IModalAddTask> = ({
  fields,
  handleSubmit,
  setIsOpenModal,
  setFields,
}) => {
  return (
    <Modal
      onClose={() => setIsOpenModal(false)}
      header={
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <X
            size={24}
            onClick={() => setIsOpenModal(false)}
            className="cursor-pointer text-gray-600 hover:text-gray-900"
          />
          <p className="text-xl font-semibold text-white">Adicionar Tarefa</p>
        </div>
      }

    >
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-4">
          <div>
            <Label text="Título" />
            <Input
              name="title"
              value={fields.title}
              onChange={(e) => setFields({ ...fields, title: e.target.value })}
              placeholder="Título da tarefa"
              required
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <Label text="Descrição" />
            <Textarea
              name="description"
              value={fields.description}
              onChange={(e) =>
                setFields({ ...fields, description: e.target.value })
              }
              placeholder="Descrição da tarefa"
              required
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <Label text="Status" />
            <Select
              name="status"
              value={fields.status}
              onChange={(e) => setFields({ ...fields, status: e.target.value })}
              options={[
                { label: "Pendente", value: "pendente" },
                { label: "Concluída", value: "concluida" },
                { label: "Em Progresso", value: "em_progresso" },
              ]}
            />
          </div>

          <div>
            <Label text="Data de Conclusão" />
            <Input
              name="finishedAt"
              type="date"
              value={fields.finishedAt}
              onChange={(e) =>
                setFields({ ...fields, finishedAt: e.target.value })
              }
              required
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <Button
            onClick={handleSubmit}
            className="py-2 px-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all"
          >
            Confirmar
            <Check size={22} className="ml-2" />
          </Button>
        </div>
      </form>
    </Modal>
  );
};
