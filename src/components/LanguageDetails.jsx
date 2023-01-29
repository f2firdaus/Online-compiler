import Select from "react-select";
import { languagelist } from "../Dropdown/languagelist";

const LanguageDetails = ({changeLanguage}) => {
  return (
    <>
      <div className="langselect">
        
        <Select options={languagelist}
          defaultValue={languagelist[0]}
          onChange={(e) => changeLanguage(e)} />
        
      </div>
    </>
  );
};
export default LanguageDetails;
