import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Problem_Navbar from "../components/Problem_Navbar";
import CodeEditor from "../components/CodeEditor";
import Sample_Table from "../components/Sample_Table";
import OutputTable from "../components/OutputTable";
import { languageOptions } from "../constants/languageOptions";

import close from "../assets/icons/close.svg";

const cppDefault = `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n\t// your code goes here\n\n\treturn 0;\n}`;

const javaDefault = `import java.util.*;\n\npublic class PsychoCoders {\n\tpublic static void main(String[] args) {\n\t\t// your code goes here\n\n\t}\n}`;

const pythonDefault = "# your code goes here";

const ProblemPage = ({
  title,
  desc,
  difficulty,
  inputFormat,
  outputFormat,
  constraints,
  sampleInput,
  actualInput,
  sampleOutput,
  actualOutput,
  explanation,
}) => {
  const convertToString = (list) => {
    const processNestedArray = (arr, depth) => {
      let result = "";
      for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
          result += processNestedArray(arr[i], depth + 1);
        } else {
          result += arr[i];
          if (i < arr.length - 1) {
            result += "";
          }
        }

        if (i < arr.length - 1) {
          result += "\n" + "".repeat(depth);
        }
      }
      return result;
    };

    return processNestedArray(list, 0);
  };

  const sampleInputStr = convertToString(sampleInput);

  const [code, setCode] = useState(cppDefault);
  const [language, setLanguage] = useState(languageOptions[0]);
  const [outputData, setOutputData] = useState("");
  const [submitData, setSubmitData] = useState("");
  const [customInput, setCustomInput] = useState(sampleInputStr);
  const [result, setResult] = useState([]);
  const [user, setUser] = useState(null);

  const outputRef = useRef(null);

  useEffect(() => {
    if (language.value === "cpp") {
      setCode(cppDefault);
    } else if (language.value === "java") {
      setCode(javaDefault);
    } else {
      setCode(pythonDefault);
    }
  }, [language]);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const user = await axios.get(
        `https://psycho-coders-server.vercel.app/auth/user`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUser(user.data);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  const addSolvedProblem = async () => {
    const userId = user._id;
    const problemUrl = window.location.href;
    const langLabel = language.label;
    const langValue = language.value;
    const submissionBy = user.username;
    const submissionDate = new Date();

    try {
      const updateUser = await axios.post(
        `https://psycho-coders-server.vercel.app/update`,
        {
          userId,
          title,
          problemUrl,
          difficulty,
          langLabel,
          langValue,
          code,
          submissionDate,
          submissionBy,
        },
        { withCredentials: true }
      );

      // setUser(updateUser.data);
      console.log(updateUser);
    } catch (error) {
      console.error(error);
    }
  };

  const generateResult = (testcases, correctAnswer, userAnswer) => {
    const len = correctAnswer.length;

    const userAnswerList = userAnswer.split("\n");

    let newList = [];
    for (let i = 0; i < len; i++) {
      if (correctAnswer[i] === userAnswerList[i]) {
        newList.push({
          testcase: Array.isArray(testcases[i + 1])
            ? convertToString(testcases[i + 1])
            : testcases[i + 1],
          userAnswer: userAnswerList[i],
          correctAnswer: correctAnswer[i],
        });
      } else {
        newList.push({
          testcase: Array.isArray(testcases[i + 1])
            ? convertToString(testcases[i + 1])
            : testcases[i + 1],
          userAnswer: userAnswerList[i],
          correctAnswer: correctAnswer[i],
        });
      }
    }

    setResult(newList);
    console.log(newList);
  };

  const onRun = async () => {
    const data = {
      script: code,
      stdin: customInput,
      language: language.languageCode,
      versionIndex: language.versionIndex,
    };

    const id = toast.loading("Processing...");

    await axios
      .post("https://psycho-coders-server.vercel.app/run", data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);

        outputRef.current.scrollIntoView({ behavior: "smooth" });

        if (res.data.cpuTime === null && res.data.memory === null) {
          toast.update(id, {
            render: "Compilation Failed!",
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        } else {
          toast.update(id, {
            render: "Compiled Successfully!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
        }

        setOutputData(res);
      })
      .catch((err) => {
        toast.update(id, {
          render: "Something went wrong!",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
        console.log("Run Error: " + err);
      });
  };

  const onSubmit = async () => {
    const data = {
      script: code,
      stdin: convertToString(actualInput),
      language: language.languageCode,
      versionIndex: language.versionIndex,
    };

    const id = toast.loading("Submitting the code...");

    await axios
      .post("https://psycho-coders-server.vercel.app/run", data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);

        let output = res.data && res.data.output;
        output = output.endsWith("\n") ? output.slice(0, -1) : output;

        console.log(output);
        if (output === convertToString(actualOutput)) {
          addSolvedProblem();
          toast.update(id, {
            render: "Correct Answer!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
        } else {
          toast.update(id, {
            render: "Wrong Answer!",
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        }

        setSubmitData(res);
        generateResult(actualInput, actualOutput, res.data && res.data.output);
      })
      .catch((err) => {
        console.log("Submit Error: " + err);
        toast.update(id, {
          render: "Something Went Wrong!",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      });
  };

  const closeSubmissionWindow = () => {
    setSubmitData(null);
  };

  return (
    <div className="h-screen min-w-[1024px]">
      <Problem_Navbar user={user} />
      <div className="w-full h-main bg-dark-gray text-white/80 flex">
        <div className="px-4 py-6 w-1/2 overflow-y-auto">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="mt-1">{desc}</p>
          <h3 className="text-xl font-bold mt-4">Input Format</h3>
          <p className="mt-1">
            {inputFormat.map((sentence, index) => {
              return <li key={index}>{sentence}</li>;
            })}
          </p>
          <h3 className="text-xl font-bold mt-4">Output Format</h3>
          <p className="mt-1">{outputFormat}</p>
          <h3 className="text-xl font-bold mt-4">Constraints</h3>
          <p className="mt-1">
            {constraints.map((constraint, index) => {
              return <li key={index}>{constraint}</li>;
            })}
          </p>
          <h3 className="text-xl font-bold mt-4">Testcases</h3>
          <div className="mt-1">
            {
              <Sample_Table
                input={convertToString(sampleInput)}
                output={convertToString(sampleOutput)}
              />
            }
          </div>
          <h3 className="text-xl font-bold mt-4">Explanation</h3>
          <p className="mt-1">
            {explanation.map((sentence, index) => {
              return <li key={index}>{sentence}</li>;
            })}
          </p>
          <div className="mt-4">
            <span className="text-white/50">Developed by </span>
            <a
              href="https://www.linkedin.com/in/vishal-r-pawar/"
              target="_blank"
              className="hover:underline"
            >
              Vishal Pawar
            </a>
          </div>
        </div>
        <div className="w-1/2 px-4 py-4 max-h-full overflow-y-auto">
          <CodeEditor
            language={language.value}
            setLanguage={setLanguage}
            code={code}
            onSubmit={onSubmit}
            onRun={onRun}
            onChange={setCode}
            input={customInput}
          />
          <div>
            <p className="py-2">Custom Input</p>
            <textarea
              rows="4"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="p-2 w-full font-roboto text-sm resize-none rounded-md border border-white/10 bg-[#303030] outline-none"
            ></textarea>
            <p className="py-2">Output</p>
            <textarea
              disabled
              ref={outputRef}
              rows="4"
              value={outputData && outputData.data.output}
              className="p-2 w-full font-roboto text-sm resize-none rounded-md border border-white/10 bg-[#303030] outline-none"
            ></textarea>
          </div>
          <div
            className={`pl-4 w-1/2 absolute left-0 ${
              submitData ? "top-[3.5rem]" : "top-full"
            } transition-all duration-500 ease-in-out`}
          >
            {submitData && (
              <div className="rounded-lg h-main bg-gray border border-white/25 flex flex-col">
                <div className="flex justify-between">
                  <p className="px-4 py-2 font-bold text-xl">Submission Info</p>
                  <button onClick={closeSubmissionWindow} className="px-4 py-2">
                    <img src={close} alt="Close" />
                  </button>
                </div>
                <OutputTable
                  results={result}
                  cpuTime={submitData.data.cpuTime}
                  memory={submitData.data.memory}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default ProblemPage;
