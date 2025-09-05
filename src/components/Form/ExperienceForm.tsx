import { useState } from "react";

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  currentJob: boolean;
  description?: string;
}

interface ExperienceFormProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
  onFormChange: (formData: Experience) => void;
  formData: Experience;
}

const initialExperienceState: Experience = {
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  description: "",
  currentJob: false,
};

export default function ExperienceForm({
  experiences,
  onChange,
  onFormChange,
  formData,
}: ExperienceFormProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  function validateField(
    name: string,
    value: string | boolean,
    data = formData
  ) {
    switch (name) {
      case "company":
        if (!value) return "Campo obrigatório";
        if (String(value).length < 2) return "Mínimo de 2 caracteres";
        return undefined;

      case "role":
        if (!value) return "Campo obrigatório";
        if (String(value).length < 2) return "Mínimo de 2 caracteres";
        return undefined;

      case "startDate":
        if (!value) return "Informe a data de início";
        if (data.endDate && String(value) > data.endDate)
          return "Início deve ser anterior ao fim";
        return undefined;

      case "endDate":
        if (value && data.startDate && String(value) < data.startDate)
          return "Fim deve ser posterior ao início";
        if (value && data.currentJob)
          return "Não deve preencher a data de fim se este for seu trabalho atual";
        return undefined;

      case "currentJob":
        if (value === true && data.endDate)
          return "Limpe a data de fim para marcar como seu trabalho atual";
        return undefined;

      default:
        return undefined;
    }
  }

  function validateForm(data = formData) {
    const nextErrors: { [key: string]: string } = {};
    Object.keys(data).forEach((key) => {
      const err = validateField(key, (data as any)[key], data);
      if (err) nextErrors[key] = err;
    });
    return {
      errors: nextErrors,
      isValid: Object.keys(nextErrors).length === 0,
    };
  }

  function setField(name: string, value: string | boolean) {
    let next = {
      ...formData,
      [name]: value,
    };

    if (name === "currentJob" && value === true) {
      next.endDate = "";
    }
    if (name === "endDate" && value) {
      next.currentJob = false;
    }

    onFormChange(next);

    setErrors((prev) => {
      const fieldError = validateField(name, value, next);
      const merged = { ...prev, [name]: fieldError };
      Object.keys(merged).forEach(
        (k) => merged[k] === undefined && delete merged[k]
      );
      return merged;
    });
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setField(name, value);
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = e.target;
    setField("currentJob", checked);
  }

  function handleAdd() {
    const { isValid, errors: finalErrors } = validateForm();
    setErrors(finalErrors);
    if (!isValid) return;

    onChange([...experiences, formData]);
    onFormChange(initialExperienceState);
    setErrors({});
  }

  const canAdd = validateForm().isValid;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-12">
        <div className="pb-12">
          <h2 className="text-xl font-semibold mb-6">Experiências</h2>
          <p className="mt-1 text-sm/6 text-(--form-paragraph-color)">
            Informe detalhes de suas experiências profissionais
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="company"
                className="block text-sm/6 font-medium text-(--form-text-color)"
              >
                Empresa *
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.company}
                  className="block w-full rounded-md bg-(--form-field-bg-color) px-3 py-1.5 text-base text-(--form-text-color) outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-(--form-field-border-color) sm:text-sm/6"
                />
                {errors.company && (
                  <span className="text-red-500 mt-3 animate-pulse text-left">
                    {errors.company}
                  </span>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="role"
                className="block text-sm/6 font-medium text-(--form-text-color)"
              >
                Cargo *
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.role}
                  className="block w-full rounded-md bg-(--form-field-bg-color) px-3 py-1.5 text-base text-(--form-text-color) outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-(--form-field-border-color) sm:text-sm/6"
                />
                {errors.role && (
                  <span className="text-red-500 mt-3 animate-pulse text-left">
                    {errors.role}
                  </span>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="startDate"
                className="block text-sm/6 font-medium text-(--form-text-color)"
              >
                Início *
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.startDate}
                  className="block w-full rounded-md bg-(--form-field-bg-color) px-3 py-1.5 text-base text-(--form-text-color) outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-(--form-field-border-color) sm:text-sm/6"
                />
                {errors.startDate && (
                  <span className="text-red-500 mt-3 animate-pulse text-left">
                    {errors.startDate}
                  </span>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="endDate"
                className="block text-sm/6 font-medium text-(--form-text-color)"
              >
                Fim
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  disabled={formData.currentJob}
                  aria-invalid={!!errors.endDate}
                  className="block w-full rounded-md bg-(--form-field-bg-color) px-3 py-1.5 text-base text-(--form-text-color) outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-(--form-field-border-color) sm:text-sm/6"
                  min={formData.startDate || undefined}
                />
                {errors.endDate && (
                  <span className="text-red-500 mt-3 animate-pulse text-left">
                    {errors.endDate}
                  </span>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm/6 font-medium text-(--form-text-color)"
              >
                Descrição
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  aria-describedby="descriptionHelp"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="block w-full rounded-md bg-(--form-field-bg-color) px-3 py-1.5 text-base text-(--form-text-color) outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
              <p
                id="descriptionHelp"
                className="mt-3 text-sm/6 text-(--form-paragraph-color)"
              >
                Descreva as atividades exercidas.
              </p>
            </div>

            <div className="mt-2 col-span-full">
              <div className="flex gap-3">
                <div className="flex h-6 shrink-0 items-center">
                  <div className="group grid size-4 grid-cols-1">
                    <input
                      id="currentJob"
                      name="currentJob"
                      type="checkbox"
                      checked={formData.currentJob}
                      onChange={handleCheckboxChange}
                      disabled={!!formData.endDate}
                      aria-invalid={!!errors.currentJob}
                      className="col-start-1 row-start-1 appearance-none rounded-sm border border-(--button-add-skill-border-color) bg-(--form-field-bg-color) checked:border-indigo-500 checked:bg-indigo-500 indeterminate:border-indigo-500 indeterminate:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:border-(--form-field-bg-color) disabled:bg-(--form-field-bg-color) disabled:checked:bg-(--form-field-bg-color) forced-colors:appearance-auto"
                    />
                    <svg
                      fill="none"
                      viewBox="0 0 14 14"
                      className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-white/25"
                    >
                      <path
                        d="M3 8L6 11L11 3.5"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-0 group-has-checked:opacity-100"
                      />
                      <path
                        d="M3 7H11"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-0 group-has-indeterminate:opacity-100"
                      />
                    </svg>
                  </div>
                </div>
                <div className="text-sm/6 flex-1">
                  <label
                    htmlFor="currentJob"
                    className="inline-block font-medium text-(--form-text-color)"
                  >
                    Trabalho atual
                  </label>
                </div>
                {errors.currentJob && (
                  <span className="text-red-500 mt-3 animate-pulse text-left">
                    {errors.currentJob}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-2 gap-x-6 col-span-full border-(--form-text-color)">
              <button
                type="button"
                onClick={handleAdd}
                disabled={!canAdd}
                className="rounded-md bg-(--button-add-skill-bg-color) border border-(--button-add-skill-border-color) px-3 py-2 text-sm/6 font-semibold text-(--form-text-color) hover:scale-101"
                title={
                  !canAdd
                    ? "Verifique suas informações antes de adicionar"
                    : "Experiência adicionada"
                }
              >
                + Adicionar Experiência
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
