import { toast } from 'react-toastify';
import { useQuestionStore } from '../../store/questionaire_store';
import { useMultiAgentStore } from '../../store/multi_agent_store';
import { useNavigate } from 'react-router-dom';
import { LuBrain } from 'react-icons/lu';

export type TypeQuestionToCopy = { question: string; options: string[] };

const CopyQuestionButton = () => {
  const { curQuestionIndex, questions, programmingLanguage } =
    useQuestionStore();
  const { setChatBotText, setAskAi } = useMultiAgentStore();
  const navigate = useNavigate();

  const curQuest = questions[curQuestionIndex];
  const questToCopy: TypeQuestionToCopy = {
    question: curQuest.title,
    options: curQuest.options,
  };

  const handleCopyQuest = async () => {
    setChatBotText(
      `I need your assistance with the question below. Be extremely precise and concise. Programing language: ${programmingLanguage}\n` +
        JSON.stringify(questToCopy, null, 2)
    );

    setAskAi();
    toast('Question sent to Agent');
    navigate('/multiAgent');
  };

  return (
    <button
      className="btn btn-outline btn-primary group md:order-none order-3"
      onClick={handleCopyQuest}
      //   disabled={disableButton}
    >
      Ask Agent <LuBrain className="group-hover:scale-125" />
    </button>
  );
};
export default CopyQuestionButton;
