import "./styles.css";
export default function StationDropdown ({ label, stationsList, value, onChange }) {
    return (
      <div className="dropdown-container">
        <label className="label">{label}</label>
        <select className="select" value={value} onChange={onChange}>
          {stationsList.map((station) => (
            <option key={station} value={station} className="option">
              {station}
            </option>
          ))}
        </select>
      </div>
    );
  };