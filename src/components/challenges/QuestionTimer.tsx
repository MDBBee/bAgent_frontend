import { useEffect } from 'react';
import { useQuestionStore } from '../../store/questionaire_store';
import { motion } from 'motion/react';

const QuestionTimer = () => {
  const {
    timer,
    updateTimer,
    questions,
    curQuestionIndex,
    progressBarTimerConstant,
    updateShowTimer,
  } = useQuestionStore();
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  useEffect(() => {
    const timerInterval = setInterval(() => {
      updateTimer(timer - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer, updateTimer]);

  return (
    <motion.div>
      <progress
        className="progress progress-primary w-full "
        value={timer}
        max={progressBarTimerConstant}
      ></progress>

      <div className="flex justify-between items-center">
        <div>
          {minutes < 10 ? '0' : ''}
          {minutes}:{seconds < 10 ? '0' : ''}
          {seconds}
        </div>
        <button
          className="btn btn-outline btn-primary"
          onClick={() => updateShowTimer()}
        >
          Stop Timer
        </button>
        <div>
          <strong>{curQuestionIndex + 1}</strong>/{questions.length || 10}
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionTimer;
