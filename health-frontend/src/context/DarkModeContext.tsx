import React, {createContext, useState, useEffect} from "react"; 

interface DarkModeProviderProps {
  children: any;
}


interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType>({
  darkMode: false,
  toggleDarkMode: () => {}, 
});



function DarkModeProvider(props: DarkModeProviderProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    console.log("saved mode:" , savedMode)
    if (savedMode) setDarkMode(savedMode === "true");
  }, []);

   useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    console.log("Toggling dark mode");
    setDarkMode(!darkMode);
  }
  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {props.children}
    </DarkModeContext.Provider>
  );
} 
export { DarkModeContext, DarkModeProvider };



// import React, { createContext, useState, ReactNode } from "react";

// // 1️⃣ Context type & default value
// interface DarkModeContextType {
//   darkMode: boolean;
//   toggleDarkMode: () => void;
// }

// const DarkModeContext = createContext<DarkModeContextType>({
//   darkMode: false,
//   toggleDarkMode: () => {},
// });

// // 2️⃣ Provider props
// interface DarkModeProviderProps {
//   children: ReactNode;
// }

// // 3️⃣ Provider component
// function DarkModeProvider({ children }: DarkModeProviderProps) {
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleDarkMode = () => setDarkMode(prev => !prev);

//   return (
//     <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
//       {children}
//     </DarkModeContext.Provider>
//   );
// }

// export { DarkModeContext, DarkModeProvider };
