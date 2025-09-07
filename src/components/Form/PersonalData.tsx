import { useEffect, useState } from "react";

export interface Personal {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
}

interface PersonalFormProps {
  personalData: Personal;
  onChange: (personal: Personal) => void;
  onFormChange: (formData: Personal) => void;
}

const initialPersonalState: Personal = {
  name: "",
  email: "",
  phone: "",
  linkedin: "",
  summary: "",
};

export default function PersonalData({
  personalData,
  onChange,
  onFormChange,
}: PersonalFormProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  function validateField(name: string, value: string, data = personalData) {
    switch (name) {
      case "name":
        if (!value) return "Campo obrigatório";
        if (String(value).length < 2) return "Mínimo de 2 caracteres";
        return undefined;

      case "email":
        if (!value) return "Campo obrigatório";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Digite um e-mail válido";
        return undefined;

      case "phone":
        if (!value) return "Campo obrigatório";
        if (!/^\d{10,11}$/.test(value))
          return "Telefone deve ter 10 ou 11 dígitos";
        return undefined;

      case "linkedin":
        if (!value)
          return "Informar o linkedin é importante para que os recrutadores analisem o seu perfil";
        if (!/^https?:\/\/(www\.)?linkedin\.com\/.+$/.test(value))
          return "Digite uma URL válida";
        return undefined;

      case "summary":
        if (!value)
          return "Use o campo como uma carta de apresentação. Fale sobre você, seus aprendizados e experiências";
        return undefined;

      default:
        return undefined;
    }
  }

  function validateForm(data = personalData) {
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

  function setField(name: string, value: string) {
    let next = {
      ...personalData,
      [name]: value,
    };

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

  useEffect(() => {
    const initialValidation = validateForm(personalData);
    setErrors(initialValidation.errors);
  }, []);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-12">
        <div className="pb-12">
          <h2 className="text-xl font-semibold mb-6">Informações Pessoais</h2>
          <p className="mt-1 text-sm/6 text-(--form-paragraph-color)">
            Informe seus dados pessoais
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-(--form-text-color)"
              >
                Nome *
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={personalData.name}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  className="block w-full rounded-md bg-(--form-field-bg-color) px-3 py-1.5 text-base text-(--form-text-color) outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-(--form-field-border-color) sm:text-sm/6"
                />
                {errors.name && (
                  <span className="text-red-500 mt-3 text-left">
                    {errors.name}
                  </span>
                )}
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-(--form-text-color)"
              >
                E-mail *
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={personalData.email}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  className="block w-full rounded-md bg-(--form-field-bg-color) px-3 py-1.5 text-base text-(--form-text-color) outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-(--form-field-border-color) sm:text-sm/6"
                />
                {errors.email && (
                  <span className="text-red-500 mt-3 text-left">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="phone"
                className="block text-sm/6 font-medium text-(--form-text-color)"
              >
                Telefone *
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={personalData.phone}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.phone}
                  className="block w-full rounded-md bg-(--form-field-bg-color) px-3 py-1.5 text-base text-(--form-text-color) outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-(--form-field-border-color) sm:text-sm/6"
                />
                {errors.phone && (
                  <span className="text-red-500 mt-3 text-left">
                    {errors.phone}
                  </span>
                )}
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="linkedin"
                className="block text-sm/6 font-medium text-(--form-text-color)"
              >
                Linkedin
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-(--form-field-bg-color) pl-3">
                  <div className="shrink-0 text-base text-gray-400 select-none sm:text-sm/6">
                    linkedin.com/in/
                  </div>
                  <input
                    id="linkedin"
                    name="linkedin"
                    type="text"
                    placeholder="seu-nome"
                    value={personalData.linkedin}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.linkedin}
                    className="block w-full rounded-md bg-(--form-field-bg-color) px-3 py-1.5 text-base text-(--form-text-color) focus:outline-none sm:text-sm/6"
                  />
                </div>
                {errors.linkedin && (
                  <span className="text-red-500 mt-3 text-left">
                    {errors.linkedin}
                  </span>
                )}
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="summary"
                className="block text-sm/6 font-medium text-(--form-text-color)"
              >
                Resumo
              </label>
              <div className="mt-2">
                <div className="mt-2">
                  <textarea
                    id="summary"
                    name="summary"
                    aria-describedby="summaryHelp"
                    value={personalData.summary}
                    onChange={handleChange}
                    rows={4}
                    className="block w-full rounded-md bg-(--form-field-bg-color) px-3 py-1.5 text-base text-(--form-text-color) outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                  <p className="text-right text-xs mt-1">
                    {(personalData.summary || "").length} / 500 caracteres
                  </p>
                </div>
                {errors.summary && (
                  <span className="text-red-500 mt-3 text-left">
                    {errors.summary}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
