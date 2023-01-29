

const OutputCode = ({output}) => {

    const getOutput = () => {
        let statusId = output?.status?.id;

        if (statusId === 6) {
          // compilation error
          return (
            <p>
              {atob(output?.compile_output)}
            </p>
          );
        } else if (statusId === 3) {
          return (
            <p>
              {atob(output.stdout) !== null
                ? `${atob(output.stdout)}`
                : null}
            </p>
          );
        } else if (statusId === 5) {
            return (
            <p>
              {`Time Limit Exceeded`}
            </p>
          );
        } else {
          return (
            <p>
              {atob(output?.stderr)}
            </p>
          );
        }
      };
    
    
    return (
        <>
            <div className="output">
                <h1>Output</h1>
                <div className="container">
                {output ? <>{getOutput()}</>:null} 
                </div>
               
                
               
                
            </div>
           
        </>
    )
}
export default OutputCode;