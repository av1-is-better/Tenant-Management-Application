import { useContext } from "react";
import { activeSectionContext } from "../../store/ActiveSectionContext";

const sections = ["Tenants", "Billing", "Transactions"];

export default function Header() {
  const currentSection = useContext(activeSectionContext).currentSection;
  const setCurrentSection = useContext(activeSectionContext).setCurrentSection;
  return (
    <header className="p-3 bg-dark text-white">
      <div className="d-flex">
        <div className="container-sm m-auto">
          <ul className="nav col-12 col-lg-auto me-lg-auto gap-2 justify-content-center m-auto">
            {sections.map((item) => {
              return (
                <li key={item}>
                  <button
                    onClick={() => setCurrentSection(item)}
                    className={`nav-link pt-0 pb-0 ${
                      item === currentSection
                        ? "text-black bg-warning border rounded"
                        : "text-white rounded"
                    }`}
                  >
                    {item}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
