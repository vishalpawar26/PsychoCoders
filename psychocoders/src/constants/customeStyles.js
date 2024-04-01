export const customStyles = {
  control: (styles) => ({
    ...styles,
    width: "100%",
    minWidth: "4rem",
    maxWidth: "6.5rem",
    borderRadius: "3px",
    backgroundColor: "rgba(30, 30, 30, 1)",
    border: "none",
    color: "rgba(255, 255, 255, 1)",
    fontSize: "0.8rem",
    lineHeigth: "1.25rem",
    cursor: "pointer",
    boxShadow: "none",
    ":hover": {
      border: "none",
      backgroundColor: "rgba(51, 51, 51, 1)",
    }
  }),
  option: (styles) => ({
    ...styles,
    color: "#ddd",
    fontSize: "0.8rem",
    lineHeigth: "1.25rem",
    width: "100%",
    backgroundColor: "#222",
    ":hover": {
      backgroundColor: "#333",
      cursor: "pointer",
      color: "#fff"
    } 
  }),
  menu: (styles) => ({
    ...styles,
    width: "100%",
    maxWidth: "6.5rem",
    backgroundColor: "#333",
    borderRadius: "3px",
    border: "1px solid #444"
  }),
  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    color: "#bbb",
    fontSize: "0.8rem",
    lineHeigth: "1.25rem"
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#ddd",
  })
}