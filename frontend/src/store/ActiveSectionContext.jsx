import { createContext } from "react";

const activeSectionContext = createContext();
const transactionIdContext = createContext();
const billingContext = createContext();

export default function ActiveSectionProvider({
  children,
  currentSection,
  setCurrentSection,
  transactionInfo,
  setTransactionInfo,
  billingInfo,
  setBillingInfo,
}) {
  return (
    <activeSectionContext.Provider
      value={{ currentSection, setCurrentSection }}
    >
      <billingContext.Provider value={{ billingInfo, setBillingInfo }}>
        <transactionIdContext.Provider
          value={{ transactionInfo, setTransactionInfo }}
        >
          {children}
        </transactionIdContext.Provider>
      </billingContext.Provider>
    </activeSectionContext.Provider>
  );
}

export { activeSectionContext, transactionIdContext, billingContext };
