import { useQuestionStore, type ProgrammingLanguage } from '../../store';

const programminglanguages = [
  { name: 'Python', value: 'python' },
  { name: 'Typescript', value: 'typescript' },
  { name: 'Javascript', value: 'javascript' },
];
const timer = [
  { name: 'None', value: 0 },
  { name: '5 mins', value: 5 },
  { name: '10 mins', value: 10 },
  { name: '15 mins', value: 15 },
];

const Settings = () => {
  const { programmingLanguage, updateProgrammingLanguage } = useQuestionStore();

  return (
    <div className="space-y-4 p-4">
      {/* Languages */}
      <div>
        <label className="select">
          <span className="label">Programming Language</span>
          <select
            value={programmingLanguage}
            onChange={(e) =>
              updateProgrammingLanguage(e.target.value as ProgrammingLanguage)
            }
          >
            {programminglanguages.map((pLang) => (
              <option key={pLang.name} value={pLang.value}>
                {pLang.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      {/* Timer */}
      <div>
        <label className="select">
          <span className="label">Timer</span>
          <select
            value={programmingLanguage}
            onChange={(e) =>
              updateProgrammingLanguage(e.target.value as ProgrammingLanguage)
            }
          >
            {timer.map((tm) => (
              <option key={tm.name} value={tm.value}>
                {tm.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};
export default Settings;
