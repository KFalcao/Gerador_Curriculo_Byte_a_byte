import React, { useState } from "react";
import DeleteIcon from "../../assets/deleteIcon.svg";

type Skill = {
  name: string;
  level: string;
};

type SkillsFormProps = {
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
};

export default function SkillsForm({ skills, setSkills }: SkillsFormProps) {
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("Básico");

  const addSkill = () => {
    if (!skillName.trim()) return;
    setSkills([...skills, { name: skillName, level: skillLevel }]);
    setSkillName("");
    setSkillLevel("Básico");
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Básico":
        return "bg-gray-200 text-gray-700";
      case "Intermediário":
        return "bg-green-200 text-green-700";
      case "Avançado":
        return "bg-blue-200 text-blue-700";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <span>🛠️</span> Habilidades
      </h2>
      <p className="text-sm text-gray-500">
        Adicione suas principais competências técnicas
      </p>

      <div className="mt-3 flex gap-2">
        <input
          type="text"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          placeholder="Nome da habilidade"
          className="flex-1 bg-(--form-field-bg-color) rounded px-3 py-2"
        />
        <select
          value={skillLevel}
          onChange={(e) => setSkillLevel(e.target.value)}
          className="bg-(--form-field-bg-color) rounded px-2 py-2"
        >
          <option>Básico</option>
          <option>Intermediário</option>
          <option>Avançado</option>
        </select>
        <button
          onClick={addSkill}
          className="px-3 py-2 bg-(--form-field-bg-color) rounded hover:bg-gray-300"
        >
          +
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-(--form-field-bg-color) rounded px-3 py-2"
          >
            <span className="font-medium">{skill.name}</span>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm px-2 py-1 rounded ${getLevelColor(
                  skill.level
                )}`}
              >
                {skill.level}
              </span>
              <button
                onClick={() => removeSkill(index)}
              >
                <img src={DeleteIcon} alt="Delete Icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
