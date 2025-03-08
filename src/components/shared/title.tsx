import React from "react";

interface TitleProps {
  text: string;
  lineLength?: string;
}

const Title: React.FC<TitleProps> = ({ text, lineLength = "100%" }) => {
  return (
    <div className="flex flex-col items-start pb-6">
      {/* Title Text */}
      <div className="font-futura font-bold text-xl xl:text-2xl text-black">
        {text}
      </div>

      {/* Line Below the Title */}
      <div className="h-[2px] bg-main mt-3" style={{ width: lineLength }} />
    </div>
  );
};

export default Title;
