import {
  useQuestionStore,
  type ProgrammingLanguage,
} from '../../store/questionaire_store';
import { motion, AnimatePresence } from 'motion/react';

const programminglanguages = [
  { name: 'Python', value: 'python' },
  { name: 'Typescript', value: 'typescript' },
  { name: 'Javascript', value: 'javascript' },
];
const timers = [
  { name: 'None', value: 0 },
  { name: '2 mins', value: 2 * 60 },
  { name: '5 mins', value: 5 * 60 },
  { name: '10 mins', value: 10 * 60 },
  { name: '15 mins', value: 15 * 60 },
];

const Settings = () => {
  const {
    programmingLanguage,
    updateProgrammingLanguage,
    updateTimer,
    timer,
    updateProgressBarTimerConstant,
    showTimer,
    updateShowTimer,
    questions,
  } = useQuestionStore();

  return (
    <AnimatePresence>
      <motion.div
        variants={{
          hidden: { y: -100, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }}
        initial="hidden"
        animate="visible"
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.5, staggerChildren: 0.3 }}
        className="space-y-4 p-4"
      >
        {/* Languages */}
        <motion.div
          variants={{
            hidden: { y: -100, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
        >
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
        </motion.div>
        {/* Timer */}
        <motion.div
          variants={{
            hidden: { x: -100, opacity: 0 },
            visible: { x: 0, opacity: 1 },
          }}
        >
          <label className="select">
            <span className="label">Timer</span>
            <select
              value={timer}
              onChange={(e) => {
                updateTimer(Number(e.target.value));
                updateProgressBarTimerConstant(Number(e.target.value));
              }}
            >
              {timers.map((tm) => (
                <option key={tm.name} value={tm.value}>
                  {tm.name}
                </option>
              ))}
            </select>
          </label>
          {questions.length > 0 && (
            <button
              className="btn btn-soft"
              onClick={() => {
                updateShowTimer();
              }}
            >
              {showTimer ? 'Stop Timer' : 'Add Timer'}
            </button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
export default Settings;
