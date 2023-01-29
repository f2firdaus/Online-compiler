import { useState } from "react";
import "./Main.css";
import CodeEditor from "./CodeEditor";
import LanguageDetails from "./LanguageDetails";
import { languagelist } from "../Dropdown/languagelist";
import ThemeDetails from "./ThemeDetails";
import axios from "axios";
import OutputCode from './OutputCode'
import CodeStatus from "./CodeStatus";
import CustomInput from "./CustomInput";

const javascriptDefault = `
/**
* Problem: find the output of the code.
*/

console.log(2+3)
`;
const Main = () => {
  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [output, setOutput] = useState(null);
  // const [theme, setTheme] = useState("cobalt");
  const [process, setProcess] = useState(null);
    const [language, setLanguage] = useState(languagelist[0]);
    
    const Api_URL="https://judge0-ce.p.rapidapi.com/submissions"
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
            setCode(data);
        break;
      }
      default: {
        console.warn("case not handled", action, data);
      }
    }
  };

    const changeLanguage = (dp) => {
        setLanguage(dp)
    }
    const codeExecute = () => {
        setProcess(true);
        const formData = {
          language_id: language.id,
          // encode source code in base64
          source_code: btoa(code),
          stdin: btoa(customInput),
        };
        const options = {
          method: "POST",
          url: Api_URL,
          params: { base64_encoded: "true", fields: "*" },
          headers: {
            "content-type": "application/json",
            "Content-Type": "application/json",
            "X-RapidAPI-Host":'judge0-ce.p.rapidapi.com',
            "X-RapidAPI-Key": '6cc2ed5dc1mshba398fff5eff51ep111d47jsn134e5132f54f',
          },
          data: formData,
        };
        axios
        .request(options)
        .then(function (response) {
          console.log("res.data", response.data);
            const token = response.data.token;
            // console.log(token)
          checkStatus(token);
        })
        .catch((err) => {
          let error = err.response ? err.response.data : err;
          // get error status
          let status = err.response.status;
          console.log("status", status);
          if (status === 429) {
            console.log("too many requests", status);
          }
          setProcess(false);
          console.log("catch block...", error);
        });
    };
    const checkStatus = async (token) => {
        const options = {
          method: "GET",
          url:Api_URL + "/" +  token,
          params: { base64_encoded: "true", fields: "*" },
          headers: {
            "X-RapidAPI-Host": 'judge0-ce.p.rapidapi.com',
            "X-RapidAPI-Key":'6cc2ed5dc1mshba398fff5eff51ep111d47jsn134e5132f54f',
          },
        };
        try {
          let response = await axios.request(options);
          let statusId = response.data.status?.id;
    
          // Processed - we have a result
          if (statusId === 1 || statusId === 2) {
            // still processing
            setTimeout(() => {
              checkStatus(token)
            }, 2000)
              return;
          } else {
            setProcess(false)
            setOutput(response.data)
            
            console.log('response.data', response.data)
              return;
          }
        } catch (err) {
          console.log("err", err);
          setProcess(false);
         
        }
      };
  return (
    <>
          <div className="main">
              <div className="header">
                  <LanguageDetails changeLanguage={changeLanguage} />
                  <ThemeDetails />
              </div>
              <div className="editor-output">              
                  <CodeEditor code={code}
            language={language?.value} onChange={onChange} />
          <div className="custom-input">
                  <OutputCode output={output} />
            <CustomInput customInput={customInput} setCustomInput={setCustomInput} />
            {output && <CodeStatus output={output} />}
            </div>
              </div>
              
              <div className="btn" >
                  <button onClick={codeExecute} disabled={!code}>
                      {process ? "Processing..." : "Compile and Execute"}</button>
              
              
              </div>
              
      </div>
    </>
  );
};
export default Main;
