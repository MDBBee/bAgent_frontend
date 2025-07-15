import { GiArchiveResearch } from 'react-icons/gi';
import { MdInput } from 'react-icons/md';

const Suggestions = () => {
  return (
    <div className="hidden md:flex items-center justify-between gap-4">
      {/* Suggestion 1 */}
      <div className="bg-base-100  shadow-md p-4 rounded-md border-2 border-base-200">
        <div className="flex flex-col justify-between  h-32">
          <h2 className="font-semibold">
            Clarification on complex questions or topics From quiz section.
          </h2>

          <p className="text-sm">
            Reference a question
            <span className="">
              <MdInput className="text-2xl hover:cursor-pointer hover:text-primary hover:scale-x-110 duration-200" />
            </span>
          </p>
        </div>
      </div>
      {/* Suggestion 2 */}
      <div className="bg-base-100  shadow-md p-4 rounded-md border-2 border-base-200">
        <div className="flex flex-col justify-between  h-32">
          <h2 className="font-semibold">
            Indepth research on topics with varying complexity.
          </h2>

          <p>
            Reference question
            <span>
              <GiArchiveResearch className="text-2xl" />
            </span>
          </p>
        </div>
      </div>
      {/* Suggestion 3 */}
      <div className="bg-base-100  shadow-md p-4 rounded-md border-2 border-base-200">
        <div className="flex flex-col justify-between h-32">
          <h2 className="font-semibold">
            Clarification on complex questions or topics From quiz section.
          </h2>

          <p>
            Reference question
            <span>
              <MdInput className="text-2xl" />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Suggestions;
