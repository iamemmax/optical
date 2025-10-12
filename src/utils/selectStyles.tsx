import Select, { StylesConfig } from "react-select";
export type OptionType = {
  label: string;
  value: string;
}
export const selectStyle: StylesConfig<OptionType, false> = {
        control: (base) => ({
            ...base,
            borderColor: "#eee",
            background: "#090E29",
            height: "2.875rem",
            boxShadow: "none",
            paddingInline: "10px",
            color: "#fff",
            fontSize: "10px",
            borderRadius: "10px",
            
            borderWidth: "0.3px",
            
            padding:"0px 3px",
            maxHeight:"10px",
            // backgroundColor:"red"

          }),
          option: (provided) => ({
            ...provided,
            color: "#333",
            background: "#fff",
            fontSize: "12px",
            zIndex: "9999999",
            "&:hover": {
              background: "#fff",
            },
          }),
          input: (provided) => ({
            ...provided,
            color: "#fff",
            fontSize: "12px",
            textTransform: "capitalize",
            borderRadius: "8px",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "#fff",
            fontSize: "12px",
            textTransform: "capitalize",
            borderRadius: "8px",
          }),
          placeholder(base) {
              return {
                ...base,
                color: "#fff",
                fontSize:"12px"
              };
          },
    };
export const selectStyle2: StylesConfig<OptionType, false> = {
        control: (base) => ({
            ...base,
            borderColor: "#eee",
            background: "#02010D",
          minHeight:"45px",

            boxShadow: "none",
            paddingInline: "10px",
            color: "#fff",
            fontSize: "10px",
            borderRadius: "10px",
            
            borderWidth: "0.3px",
            
            padding:"0px 3px",
            maxHeight:"10px",
            // backgroundColor:"red"

          }),
          option: (provided) => ({
            ...provided,
            color: "#333",
            background: "#fff",
            fontSize: "12px",
            zIndex: "9999999",
            "&:hover": {
              background: "#fff",
            },
          }),
          input: (provided) => ({
            ...provided,
            color: "#fff",
            fontSize: "12px",
            textTransform: "capitalize",
            borderRadius: "8px",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "#fff",
            fontSize: "12px",
            textTransform: "capitalize",
            borderRadius: "8px",
            
          }),
     
  
          placeholder(base) {
              return {
                ...base,
                color: "#fff",
                fontSize:"12px"
              };
          },
    };