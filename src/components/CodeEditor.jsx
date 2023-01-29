import Editor from "@monaco-editor/react";
import { useState } from "react";

const CodeEditor = ({code,onChange,language,theme}) => {

    const [value,setValue]=useState(code|| "")
    
    const handleEditor = (value) => {
        setValue(value);
        onChange("code",value)
    }
    return (
        <>
            <div className="editor">
                <Editor  height="86vh" width={`86%`}
              language={language || "javascript"} value={value} onChange ={handleEditor} defaultValue="//some Comment"  theme={theme}  />
            </div>
            
        </>
    )
}
export default CodeEditor;