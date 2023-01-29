const CustomInput = ({customInput,setCustomInput}) => {
    
    return (
        <>
            <div className="custom">
                <h1>Custom Input</h1>
                <textarea value={customInput} onChange={(e)=>setCustomInput(e.target.value)} name="" id="" cols="50" rows="10"></textarea>
            </div>
        </>
    )
}
export default CustomInput;