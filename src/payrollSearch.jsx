import "./App.css";
import { useState, useEffect } from "react";
import logoImage from "./SoundPound.png";
import employerLookupFile from "./employerLookup.json";
import ManchesterLogo from "./assets/logos/ManchesterLogo.png";
import SalfordLogo from "./assets/logos/SalfordLogo.png";
import SouthManchesterLogo from "./assets/logos/SouthManchesterLogo.png";
import MetroMoneywiseLogo from "./assets/logos/MetroMoneywise.png";
import CopperpotLogo from "./assets/logos/Copperpot.png";
import Select from "react-select";
import { Link } from "react-router-dom";
function PayrollSearch() {
  const [payrollPartners, setPayrollPartners] = useState([]);
  const [selectedEmployer, setSelectedEmployer] = useState("");
  const [result, setResult] = useState("");
  const [searchDone, setSearchDone] = useState(false);
  const [iserror, setIsError] = useState(false);

  const handleEmployerChange = (e) => {
    setSelectedEmployer({ name: e.label, creditUnions: e.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedEmployer === "") {
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      setIsError(true);
    } else {
      setResult(() => {
        return selectedEmployer;
      });

      setSearchDone(true);
    }
  };

  const handleEmployerReset = () => {
    setResult("");
    setSearchDone(false);
    setSelectedEmployer("");
  };

  const converterFunc = (obj) => {
    const newEmployers = Object.keys(obj).map((employer) => ({
      value: obj[employer],
      label: employer,
    }));

    setPayrollPartners((prevState) =>
      newEmployers.sort((a, b) => a.label.localeCompare(b.label))
    );
  };

  const creditUnionDataTable = {
    Manchester: {
      name: "Manchester Credit Union",
      img_url: ManchesterLogo,
      ApplyLink:
        "https://manchestercreditunion.co.uk/products/loans/bee-network-annual-bus-ticket",
    },
    "South Manchester": {
      name: "South Manchester Credit Union",
      img_url: SouthManchesterLogo,
      ApplyLink: "https://www.smcreditunion.co.uk/annual-bee-bus-ticket/",
    },
    Salford: {
      name: "Salford Credit Union",
      img_url: SalfordLogo,
      ApplyLink:
        "https://www.salfordcreditunion.com/annual-bee-bus-ticket-loan/",
    },
    "Metro Moneywise": {
      name: "Metro Moneywise Credit Union",
      img_url: MetroMoneywiseLogo,
      ApplyLink: "https://www.metromoneywise.co.uk/loans/annual-bee-bus-ticket",
    },
    "No1 Copperpot": {
      name: "No1 Copperpot Credit Union",
      img_url: CopperpotLogo,
      ApplyLink: "https://www.no1copperpot.com/police-loans/green-loan/",
    },
  };

  useEffect(() => {
    converterFunc(employerLookupFile);
  }, []);

  return (
    <div className="payrollSearch">
      <div className="card">
        <img src={logoImage} alt="Logo" className="logo" />
        {iserror ? (
          <h3 className="error-message">
            Please select an employer by either starting to type or from the
            drop down list
          </h3>
        ) : null}
        {searchDone ? (
          <div className="payroll-results">
            <h2>
              Your employer, {selectedEmployer.name} is partnered with the below
              Credit Unions that provide green finance
            </h2>
            {result.creditUnions.map((creditunion) => {
              return (
                <div className="result" key={creditunion}>
                  <div className="logo-name-container">
                    <p className="result-text">
                      {creditUnionDataTable[creditunion].name}
                    </p>
                    <img
                      src={creditUnionDataTable[creditunion].img_url}
                      className="result-logo"
                    />
                  </div>

                  <button className="apply-button">
                    <a
                      href={creditUnionDataTable[creditunion].ApplyLink}
                      target="_blank"
                    >
                      Visit Site
                    </a>
                  </button>
                </div>
              );
            })}
            <div className="nav-button-container">
              <button className="nav-button" onClick={handleEmployerReset}>
                Go back
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1>Select your employer</h1>
            <form className="enter-form">
              <Select
                options={payrollPartners}
                className="react-select"
                onChange={handleEmployerChange}
              />
              <button
                type="submit"
                className="apply-button"
                onClick={handleSubmit}
              >
                See Results
              </button>
            </form>
          </>
        )}
        <h3>
          There may be more than one credit union you can access green finance through.{" "}
        </h3>
        <Link to="/" className="nav-button">
          Start again
        </Link>
        <p className="email-text">
          Need any help finding your credit union? Just email&nbsp;
          <a href="mailto:hello@soundpoundgroup.co.uk" className="email-text">
            hello@soundpoundgroup.co.uk&nbsp;
          </a>
          and we’ll get you sorted.
        </p>
      </div>
    </div>
  );
}

export default PayrollSearch;
