import { LANGUAGE_VERSIONS } from "./UI/Constants";

const Languages = Object.entries(LANGUAGE_VERSIONS)

export default function LanguageSelector() {
    return (
        <div className="">
            {/* Add headless UI instead of select and option tags */}
            <select>
                {Languages.map(([language, version]) => (
                    <option key={language}>{language}
                    &nbsp;
                    {/* Add headless UI to wrap version in a text box */}
                    {version}
                    </option>
                ))}
            </select>
        </div>
    );