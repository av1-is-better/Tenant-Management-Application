import { useContext } from "react";
import { activeSectionContext } from "../../store/ActiveSectionContext";
import { SiCashapp } from "react-icons/si";

export default function AddTransaction() {
  const setCurrentSection = useContext(activeSectionContext).setCurrentSection;
  return (
    <>
      <div className="container mt-4">
        <div className="col m-3">
          <div>
            <div className="container text-end" style={{ maxWidth: "50rem" }}>
              <button
                onClick={() => {
                  setCurrentSection("AddTransaction");
                }}
                type="button"
                className="btn btn-warning text-dark"
              >
                <SiCashapp /> Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
