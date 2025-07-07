import { useQuestionStore, type ProgrammingLanguage } from '../../store';
import NextButton from './NextButton';
import PrevButton from './PrevButton';
import Question from './Question';

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

const QuestionContainer = () => {
  const {
    isLoading,
    questions,
    programmingLanguage,
    updateProgrammingLanguage,
  } = useQuestionStore();

  return (
    <div className="col-span-full overflow-x-hidden">
      {questions.length !== 0 && !isLoading ? (
        <div>
          {/* Questions */}
          <Question />
          <footer className="md:w-1/3   flex items-center justify-between">
            <PrevButton />
            <NextButton />
          </footer>
        </div>
      ) : !isLoading ? (
        <div className="mb-4 p-4 space-y-4">
          <h2 className="capitalize text-2xl font-bold py-4 mb-4">
            Welcome To Coding tutor. Agent powered questionaire
          </h2>
          <p>
            <span className="text-lg font-bold">Note:</span> Each quiz section
            comprise of 15 questions.{' '}
          </p>
          <p>Start by setting your question Parameters below: </p>
          {/* Programing Language */}
          <div>
            <label className="select">
              <span className="label">Programming Language</span>
              <select
                value={programmingLanguage}
                onChange={(e) =>
                  updateProgrammingLanguage(
                    e.target.value as ProgrammingLanguage
                  )
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
                  updateProgrammingLanguage(
                    e.target.value as ProgrammingLanguage
                  )
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
      ) : (
        <div className="bg-base-300 p-3 rounded-md h-[30rem] ">
          <div className="skeleton h-[20%] mb-4"></div>
          <div className="skeleton h-[70%]"></div>
        </div>
      )}
    </div>
  );
};
export default QuestionContainer;
