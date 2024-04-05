import React from "react";
import Editor from "@monaco-editor/react";
import Select from "react-select";
import { customStyles } from "../constants/customeStyles";
import { languageOptions } from "../constants/languageOptions";

import run from "../assets/icons/run.svg";
import submit from "../assets/icons/submit.svg";

const CodeEditor = ({
  language,
  setLanguage,
  code,
  onSubmit,
  onRun,
  onChange,
}) => {
  return (
    <div>
      <div className="py-2 flex justify-between">
        <Select
          options={languageOptions}
          styles={customStyles}
          defaultValue={languageOptions[0]}
          onChange={(e) => setLanguage(e)}
        />
        <button className="text-gray-100 px-2 rounded hover:bg-gray">
          Reset
        </button>
      </div>
      <div className="rounded overflow-hidden">
        <div className="bg-[#1e1e1e] h-2"></div>
        <Editor
          width="100%"
          height="60vh"
          theme="vs-dark"
          language={language}
          onChange={(e) => onChange(e)}
          value={code}
          options={{
            scrollBeyondLastLine: false,
          }}
        />
      </div>
      <div className="py-2 flex justify-end gap-2">
        <button
          onClick={onRun}
          className="px-4 py-1 text-[#ddd] rounded bg-gray hover:bg-light-gray transition flex"
        >
          <img src={run} alt="Run" /> <span>Run</span>
        </button>
        <button
          onClick={onSubmit}
          className="px-4 py-1 text-green rounded bg-gray hover:bg-light-gray transition flex gap-1"
        >
          <img src={submit} alt="Submit" /> <span>Submit</span>
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
