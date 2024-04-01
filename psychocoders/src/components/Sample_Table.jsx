import React from "react";

const Sample_Table = ({ input, output }) => {
  return (
    <div className="w-full bg-white/5">
      <div className="flex justify-between">
        <div className="px-4 py-2 w-1/2 border border-white/10">Input</div>
        <div className="px-4 py-2 w-1/2 border border-white/10">Output</div>
      </div>
      <div className="flex justify-between">
        <pre className="px-4 py-2 w-1/2 border border-white/10">{input}</pre>
        <pre className="px-4 py-2 w-1/2 border border-white/10">{output}</pre>
      </div>
    </div>
  );
};

export default Sample_Table;
