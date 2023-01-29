const CodeStatus = ({output}) => {
    
    return (
        <>
            <div className="codestatus">
                <p>
                    Status:{" "}
                    <span> {output?.status?.description} </span>
                </p>
                <p>
        Memory:{" "}
        <span >
          {output?.memory}
        </span>
      </p>
      <p >
        Time:{" "}
        <span >
          {output?.time}
        </span>
      </p>
        </div>
        </>
    )
}
export default CodeStatus;