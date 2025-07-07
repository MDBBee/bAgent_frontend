import { useEffect, useState } from 'react';
import { useQuestionStore } from '../../store';

const calculateTimeLeft = (targetTime: string) => {
  const currentDate = new Date();
  const lastResetDate = new Date(targetTime);
  const expiryDate = Number(lastResetDate) + 24 * 60 * 60 * 1000;
  const timeDifference = Math.max(expiryDate - Number(currentDate), 0);

  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return {
    hours,
    minutes,
    seconds,
  };
};

const CountDown = () => {
  const [count, setCount] = useState<ReturnType<typeof calculateTimeLeft>>();
  const { quota } = useQuestionStore();
  const lastReset = quota?.last_reset_date;
  // console.log('✅✅LastReset', typeof lastReset);
  // 2025-07-07T06:25:48.186813

  useEffect(() => {
    setCount(calculateTimeLeft(lastReset as string));
    // console.log('✅✅', calculateTimeLeft(lastReset!));

    const interId = setInterval(() => {
      const newTime = calculateTimeLeft(lastReset as string);
      setCount(newTime);

      if (newTime.hours === 0 && newTime.minutes === 0 && newTime.seconds === 0)
        clearInterval(interId);
    }, 1000);

    return () => clearInterval(interId);
  }, [lastReset]);

  if (!lastReset)
    return (
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <span className="loading loading-infinity loading-3xl "></span>
        {/* <div className="skeleton h-32 w-32"></div> */}
      </div>
    );

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono md:text-xl text-sm">
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
        <span className="countdown font-mono md:text-xl text-sm">
          <span
            style={{ '--value': count?.minutes } as React.CSSProperties}
            aria-live="polite"
            // aria-label={counter}
          >
            {count?.minutes}
          </span>
        </span>
        min
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono md:text-xl text-sm">
          <span
            style={{ '--value': count?.seconds } as React.CSSProperties}
            aria-live="polite"
            // aria-label={counter}
          >
            {count?.seconds}
          </span>
        </span>
        sec
      </div>
    </div>
  );
};
export default CountDown;
