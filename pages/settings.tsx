import { useSetting } from "../services/SettingsService";
import { NextPage } from "next";

const SettingsPage: NextPage = () => {
  const [showObsceneSongs, setShowObsceneSongs] =
    useSetting("showObsceneSongs");
  return (
    <div>
      <h2>Inställningar</h2>
      <form>
        <div className="form-check form-group">
          <input
            className="form-check-input"
            type="checkbox"
            id="obscene"
            checked={showObsceneSongs}
            onChange={(event) => setShowObsceneSongs(event.target.checked)}
          />
          <label className="form-check-label" htmlFor="obscene">
            Visa oanständig sånger
          </label>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
