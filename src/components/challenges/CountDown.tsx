import { useEffect, useState } from 'react';
import { useQuestionStore } from '../../store';

type Count = {
  hours: number;
  mins: number;
  secs: number;
};

const CountDown = () => {
  const [count, setCount] = useState<Count>({ hours: 0, mins: 0, secs: 0 });
  const { quota } = useQuestionStore();
  const lastReset = quota?.last_reset_date;
  console.log(lastReset);
  console.log(count.hours, count.mins, count.secs);

  const calculateTimeLeft = () => {
    const timeLeft = new Date(lastReset!).getTime() - new Date().getTime();
    const hours = timeLeft / (1000 * 60 * 60);
    const hoursLeft = Math.floor(hours);
    const minutes = (hours - hoursLeft) * 60;
    const minutesLeft = Math.floor(minutes);
    const secondsLeft = Math.floor((minutes - minutesLeft) * 60);
    // console.log(typeof hoursLeft, hoursLeft, minutesLeft, secondsLeft);

    setCount({
      hours: hoursLeft,
      mins: minutesLeft,
      secs: secondsLeft - 1,
    });
  };

  useEffect(() => {
    const interId = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(interId);
  }, [lastReset]);

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-2xl">
          <span
            style={
              {
                '--value': Math.abs(count?.hours as number),
              } as React.CSSProperties
            }
            aria-live="polite"
            // aria-label={counter}
          >
            {count?.hours}
          </span>
        </span>
        hours
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-2xl">
          <span
            style={{ '--value': count?.mins } as React.CSSProperties}
            aria-live="polite"
            // aria-label={counter}
          >
            {count?.mins}
          </span>
        </span>
        min
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-2xl">
          <span
            style={{ '--value': count?.secs } as React.CSSProperties}
            aria-live="polite"
            // aria-label={counter}
          >
            {count?.secs}
          </span>
        </span>
        sec
      </div>
    </div>
  );
};
export default CountDown;
