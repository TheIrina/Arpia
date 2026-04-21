import React from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

export const SplitText = ({ text, className = "", wordClassName = "" }: SplitTextProps) => {
  const wordsArray = text.split(" ");
  
  return (
    <span className={className}>
      {wordsArray.map((word, wordPos) => (
        <span key={`${word}-${wordPos}`} className="inline-block">
          <span className={wordClassName}>{word}</span>
          {wordPos < wordsArray.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
};
