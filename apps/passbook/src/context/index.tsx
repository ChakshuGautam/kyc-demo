import { createContext, useContext, useState } from "react";
import { discovery } from "config/discovery";

export const Context = createContext<any>(null);

export function StateProvider({ children }) {
  const [familyData, setFamilyData] = useState();
  const [recommendedSchemes, setRecommendedSchemes] = useState<any[]>([]);
  const [locale, setLocale] = useState("hi");
  const [form, setForm] = useState(discovery);
  const [formData, setFormData] = useState([]);
  const [modaleOpen, setModaleOpen] = useState(false);
  const [loginData, setLoginData] = useState({
    aadhar: "",
    txn: "",
    mobile: "",
  });
  const [discoveryMember, setDiscoveryMember] = useState({
    nameh: "",
    namee: "",
  });
  const [discoveredScheme, setDiscoveredScheme] = useState({
    nameh: "",
    namee: "",
    documentse: "",
    documentsh: "",
  });

  return (
    <Context.Provider
      value={{
        familyData,
        setFamilyData,
        locale,
        setLocale,
        modaleOpen,
        setModaleOpen,
        recommendedSchemes,
        setRecommendedSchemes,
        form,
        setForm,
        formData,
        setFormData,
        loginData,
        setLoginData,
        discoveryMember,
        setDiscoveryMember,
        discoveredScheme,
        setDiscoveredScheme,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useStateContext() {
  return useContext(Context);
}
