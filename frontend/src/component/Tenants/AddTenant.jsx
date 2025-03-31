import { MdAddHome } from "react-icons/md";
import { useContext } from "react";
import { activeSectionContext } from "../../store/ActiveSectionContext";

export default function AddTenant() {
  const setCurrentSection = useContext(activeSectionContext).setCurrentSection;
  return (
    <>
      <div className="container" style={{ maxWidth: "30rem" }}>
        <div className="col m-3">
          <div>
            <div className="text-end">
              <button
                onClick={() => {
                  setCurrentSection("AddTenant");
                }}
                type="button"
                className="btn btn-warning text-dark"
              >
                <MdAddHome></MdAddHome> Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
