import { useState } from "react";
import Columns from "./components/Layout/Columns";
import Hero from "./components/Hero";
import ResumePreview from "./components/Preview/ResumePreview";
import ExperienceForm from "./components/Form/ExperienceForm";
import type { Experience } from "./components/Form/ExperienceForm";
import PersonalData from "./components/Form/PersonalData";
import type { Personal } from "./components/Form/PersonalData";
import SkillsForm from "./components/Form/SkillsForm";

type Skill = {
  name: string;
  level: string;
};

const initialPersonalState: Personal = {
  name: "",
  email: "",
  phone: "",
  linkedin: "",
  summary: "",
};



const initialExperienceState: Experience = {
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  description: "",
  currentJob: false,
};

export default function App() {
  const [personalData, setPersonalData] =
    useState<PersonalData>(initialPersonalState);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [currentFormData, setCurrentFormData] = useState<Experience>(
    initialExperienceState
  );

  const handlePersonalDataChange = (newPersonalData: Personal) => {
    setPersonalData(newPersonalData);
  };

  const handleExperiencesChange = (newExperiences: Experience[]) => {
    setExperiences(newExperiences);
  };

  const handleFormChange = (formData: Experience) => {
    setCurrentFormData(formData);
  };

  return (
    <div
      className="w-screen min-h-screen flex flex-col"
      style={{
        background: `linear-gradient(180deg, #0A2248 0%, #0B2249 50%, #0A224A 75%, #092148 88%, #0A1F3C 100%)`,
      }}
    >
      <Hero />
      <section
        id="formulario"
        className="w-full min-h-screen px-6 py-16 flex justify-center items-start"
      >
        <Columns>
          <div className="bg-white min-h-screen flex items-start justify-center p-8 rounded-md">
            <div className="w-full max-w-md text-(--form-text-color)">
              <PersonalData
                personalData={personalData}
                onChange={handlePersonalDataChange}
                onFormChange={handlePersonalDataChange}
              />
              <SkillsForm skills={skills} setSkills={setSkills} />
              <ExperienceForm
                experiences={experiences}
                onChange={handleExperiencesChange}
                onFormChange={handleFormChange}
                formData={currentFormData}
              />
            </div>
          </div>

          <div className="lg:sticky lg:top-8 lg:self-start">
            <ResumePreview
              personalData={personalData}
              skills={skills}
              experiences={experiences}
              currentFormData={currentFormData}
            />
          </div>
        </Columns>
      </section>
    </div>
  );
}
