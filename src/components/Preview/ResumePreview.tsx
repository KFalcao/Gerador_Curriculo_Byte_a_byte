import type { Experience } from "../Form/ExperienceForm";

interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  currentJob: boolean;
  description?: string;
}

interface ResumePreviewProps {
  personal: PersonalData;
  experiences: Experience[];
  currentFormData: Experience;
}

export default function ResumePreview({
  personalData,
  experiences,
  currentFormData,
}: ResumePreviewProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      month: "short",
      year: "numeric",
    });
  };

  const hasCurrentFormData = Boolean(
    currentFormData.company || currentFormData.role
  );

  return (
    <div className="bg-white min-h-screen flex items-start justify-center p-8 rounded-md">
      <div className="w-full max-w-md text-(--form-text-color)">
        {/* DADOS PESSOAIS NO PREVIEW */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-2 mb-3">
            Dados Pessoais
          </h3>
          {personalData.name && (
            <p className="text-lg font-medium">{personalData.name}</p>
          )}
          {personalData.email && (
            <p className="text-gray-600">{personalData.email}</p>
          )}
          {personalData.phone && (
            <p className="text-gray-600">{personalData.phone}</p>
          )}
          {personalData.linkedin && (
            <p className="text-blue-600 underline">
              <a href="https://www.linkedin.com/">https://www.linkedin.com/</a>
              {personalData.linkedin}
            </p>
          )}
          {personalData.summary && (
            <div className="mt-3">
              <h4 className="font-medium text-gray-700">Resumo</h4>
              <p className="text-gray-600 text-sm">{personalData.summary}</p>
            </div>
          )}
        </div>

        {/* Lista de experiências */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-2">
            Experiência Profissional
          </h3>

          {experiences.map((exp, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-lg font-medium text-gray-800">
                    {exp.role}
                  </h4>
                  <p className="text-gray-600 font-medium">{exp.company}</p>
                </div>
                <div className="text-sm text-gray-500 text-right">
                  <p>
                    {formatDate(exp.startDate)} -{" "}
                    {exp.currentJob ? "Atual" : formatDate(exp.endDate)}
                  </p>
                </div>
              </div>
              {exp.description && (
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
          {/* Preview em tempo real do formulário atual */}
          {hasCurrentFormData && (
            <div className="border-l-4 border-orange-400 pl-4 bg-orange-50 p-3 rounded-r-md">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full font-medium">
                  Em edição
                </span>
              </div>

              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-lg font-medium text-gray-800">
                    {currentFormData.role || "Cargo não informado"}
                  </h4>
                  <p className="text-gray-600 font-medium">
                    {currentFormData.company || "Empresa não informada"}
                  </p>
                </div>
                <div className="text-sm text-gray-500 text-right">
                  <p>
                    {currentFormData.startDate
                      ? formatDate(currentFormData.startDate)
                      : "- "}{" "}
                    -{" "}
                    {currentFormData.currentJob
                      ? "Atual"
                      : currentFormData.endDate
                      ? formatDate(currentFormData.endDate)
                      : "- "}
                  </p>
                </div>
              </div>
              {currentFormData.description && (
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  {currentFormData.description}
                </p>
              )}
            </div>
          )}
          {/* Mensagem quando não há experiências */}
          {experiences.length === 0 && !hasCurrentFormData && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg mb-2">
                Nenhuma experiência adicionada ainda
              </p>
              <p className="text-sm">
                Comece preenchendo o formulário ao lado para ver o preview em
                tempo real
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
