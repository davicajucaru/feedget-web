import { useState } from "react";

import { CloseButton } from "../CloseButton";

import bugImg from "../../assets/bug.svg";
import ideaImg from "../../assets/idea.svg";
import thoughtImg from "../../assets/thought.svg";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: "Problem",
    image: {
      source: bugImg,
      alt: "insect bug",
    },
  },
  IDEA: {
    title: "Idea",
    image: {
      source: ideaImg,
      alt: "ballon",
    },
  },
  OTHER: {
    title: "Other",
    image: {
      source: thoughtImg,
      alt: "cloud",
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);

  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedbackSuccessStep
          onFeedbackRestartRequested={handleRestartFeedback}
        />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400 ">
        Made with ♥ by
        <a
          className="underline underline-offset-2 ml-1"
          href="https://rocketseat.com.br"
        >
          Rocketseat
        </a>
      </footer>
    </div>
  );
}
