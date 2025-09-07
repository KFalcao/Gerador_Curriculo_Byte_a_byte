import type { Experience } from "../Form/ExperienceForm";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface PersonalData {
  name?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  summary?: string;
}

interface ResumePreviewProps {
  personalData: PersonalData;
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
    return date.toLocaleDateString("pt-BR", { month: "short", year: "numeric" });
  };

  const hasCurrentFormData = Boolean(
    currentFormData.company || currentFormData.role
  );

  const exportToPDF = async () => {
    const element = document.getElementById("resume-preview-pdf");
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("curriculo.pdf");
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-4 flex justify-end">
         <button
    onClick={exportToPDF}
    className="flex items-center justify-center gap-2 bg-[#32749D] text-[#092148] font-medium px-4 py-2 rounded-md hover:bg-[#295d7a] transition"
  >
    Exportar para PDF
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2a2 2 0 00-2 2v12H7l5 5 5-5h-3V4a2 2 0 00-2-2z" />
    </svg>
  </button>
      </div>

      <div id="resume-preview" className="bg-white p-8 rounded-md">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <h3 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-3">
              Dados Pessoais
            </h3>
            {personalData.name && <p className="text-lg font-medium">{personalData.name}</p>}
            {personalData.email && <p>{personalData.email}</p>}
            {personalData.phone && <p>{personalData.phone}</p>}
            {personalData.linkedin && (
              <p className="text-blue-600 underline">
                <a href={`https://www.linkedin.com/in/${personalData.linkedin}`} target="_blank" rel="noopener noreferrer">
                  {personalData.linkedin}
                </a>
              </p>
            )}
            {personalData.summary && (
              <div className="mt-3">
                <h4 className="font-medium">Resumo</h4>
                <p className="text-sm">{personalData.summary}</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold border-b border-gray-300 pb-2">
              Experiência Profissional
            </h3>
            {experiences.map((exp, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-lg font-medium">{exp.role}</h4>
                    <p className="font-medium">{exp.company}</p>
                  </div>
                  <div className="text-sm text-right">
                    <p>{formatDate(exp.startDate)} - {exp.currentJob ? "Atual" : formatDate(exp.endDate)}</p>
                  </div>
                </div>
                {exp.description && <p className="text-sm mt-2 leading-relaxed">{exp.description}</p>}
              </div>
            ))}

            {hasCurrentFormData && (
              <div className="border-l-4 border-orange-400 pl-4 bg-orange-50 p-3 rounded-r-md">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full font-medium">
                    Em edição
                  </span>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-lg font-medium">{currentFormData.role || "Cargo não informado"}</h4>
                    <p className="font-medium">{currentFormData.company || "Empresa não informada"}</p>
                  </div>
                  <div className="text-sm text-right">
                    <p>{currentFormData.startDate ? formatDate(currentFormData.startDate) : "-"} - {currentFormData.currentJob ? "Atual" : currentFormData.endDate ? formatDate(currentFormData.endDate) : "-"}</p>
                  </div>
                </div>
                {currentFormData.description && <p className="text-sm mt-2 leading-relaxed">{currentFormData.description}</p>}
              </div>
            )}

            {experiences.length === 0 && !hasCurrentFormData && (
              <div className="text-center py-8">
                <p className="text-lg mb-2">Nenhuma experiência adicionada ainda</p>
                <p className="text-sm">Comece preenchendo o formulário ao lado para ver o preview em tempo real</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        id="resume-preview-pdf"
        style={{
          position: "absolute",
          left: "-9999px",
          color: "#1f2937",
          backgroundColor: "#ffffff",
          fontFamily: "Arial, Helvetica, sans-serif",
          width: "600px",
          padding: "24px",
        }}
      >
        <div>
          <h3 style={{ fontWeight: 600, borderBottom: "1px solid #ccc", paddingBottom: "8px", marginBottom: "16px", fontSize: "18px" }}>
            Dados Pessoais
          </h3>
          {personalData.name && <p style={{ fontSize: "16px", fontWeight: 500, marginBottom: "4px" }}>{personalData.name}</p>}
          {personalData.email && <p style={{ marginBottom: "4px" }}>{personalData.email}</p>}
          {personalData.phone && <p style={{ marginBottom: "4px" }}>{personalData.phone}</p>}
          {personalData.linkedin && <p style={{ color: "#2563eb", textDecoration: "underline", marginBottom: "8px" }}>{personalData.linkedin}</p>}
          {personalData.summary && <p style={{ marginTop: "8px", fontSize: "14px" }}>{personalData.summary}</p>}

          <h3 style={{ fontWeight: 600, borderBottom: "1px solid #ccc", paddingBottom: "8px", marginTop: "24px", marginBottom: "16px", fontSize: "18px" }}>
            Experiência Profissional
          </h3>

          {experiences.map((exp, index) => (
            <div key={index} style={{ borderLeft: "4px solid #3b82f6", paddingLeft: "8px", marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h4 style={{ fontWeight: 500, fontSize: "16px" }}>{exp.role}</h4>
                  <p>{exp.company}</p>
                </div>
                <div style={{ fontSize: "12px", textAlign: "right" }}>
                  <p>{formatDate(exp.startDate)} - {exp.currentJob ? "Atual" : formatDate(exp.endDate)}</p>
                </div>
              </div>
              {exp.description && <p style={{ fontSize: "12px", marginTop: "4px" }}>{exp.description}</p>}
            </div>
          ))}

          {hasCurrentFormData && (
            <div style={{ borderLeft: "4px solid #f97316", padding: "12px", marginBottom: "16px", backgroundColor: "#fff7ed", borderRadius: "6px" }}>
              <div style={{ display: "inline-block", backgroundColor: "#ffedd5", color: "#c2410c", fontSize: "10px", padding: "2px 6px", borderRadius: "999px", marginBottom: "8px", fontWeight: 500 }}>
                Em edição
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h4 style={{ fontWeight: 500, fontSize: "16px" }}>{currentFormData.role || "Cargo não informado"}</h4>
                  <p>{currentFormData.company || "Empresa não informada"}</p>
                </div>
                <div style={{ fontSize: "12px", textAlign: "right" }}>
                  <p>{currentFormData.startDate ? formatDate(currentFormData.startDate) : "-"} - {currentFormData.currentJob ? "Atual" : currentFormData.endDate ? formatDate(currentFormData.endDate) : "-"}</p>
                </div>
              </div>
              {currentFormData.description && <p style={{ fontSize: "12px", marginTop: "4px" }}>{currentFormData.description}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
