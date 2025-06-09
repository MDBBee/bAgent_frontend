import ChallengesForm from '../components/challenges/ChallengesForm';
import { useGenerateChallenge } from '../utils/hooks';

const example = {
  correct_answer_id: 0,
  difficulty: 'easy',
  explanation:
    'The // operator performs integer division, which discards the decimal part of the result. 7 // 2 equals 3.',
  id: 21,
  options: ['3', '3.5', '4', 'Error'],
  timestamp: '2025-06-09T09:20:21.452539',
  title: 'What is the output of the expression 7 // 2 in Python?',
};

const GenerateChallenges = () => {
  const { data, isLoading, error } = useGenerateChallenge('easy');

  console.log(data);

  return (
    <>
      <ChallengesForm />
    </>
  );
};
export default GenerateChallenges;
