"use client";

import { useState } from "react";

type Row = { key: number };

export default function PortfolioDetailsFields() {
  const [education, setEducation] = useState<Row[]>([{ key: 0 }]);
  const [experience, setExperience] = useState<Row[]>([{ key: 0 }]);
  const [social, setSocial] = useState<Row[]>([{ key: 0 }]);
  const [nextKey, setNextKey] = useState(1);

  function add(setRows: (rows: Row[] | ((current: Row[]) => Row[])) => void) {
    const key = nextKey;
    setNextKey((value) => value + 1);
    setRows((rows) => [...rows, { key }]);
  }

  return <>
    <fieldset className="details-group wide">
      <legend>Education</legend>
      {education.map(({ key }, index) => <div className="details-row" key={key}>
        <input type="hidden" name="education_row_key" value={key} />
        <label>School<input name="education_school" maxLength={180} /></label>
        <label>Degree<input name="education_degree" maxLength={180} placeholder="Bachelor’s degree" /></label>
        <label>Field of study<input name="education_field" maxLength={180} placeholder="Information Technology" /></label>
        <label>Start date<input name="education_start" type="date" /></label>
        <label>End date<input name="education_end" type="date" /></label>
        <label>Description<textarea name="education_description" maxLength={2000} /></label>
        <label className="details-check"><input name={`education_current_${key}`} type="checkbox" value="true" /> Currently studying</label>
        {education.length > 1 && <button className="secondary-button details-remove" type="button" onClick={() => setEducation((rows) => rows.filter((row) => row.key !== key))} aria-label={`Remove education ${index + 1}`}>Remove</button>}
      </div>)}
      <button className="secondary-button" type="button" onClick={() => add(setEducation)}>＋ Add education</button>
    </fieldset>

    <fieldset className="details-group wide">
      <legend>Work experience</legend>
      {experience.map(({ key }, index) => <div className="details-row" key={key}>
        <input type="hidden" name="experience_row_key" value={key} />
        <label>Position<input name="experience_position" maxLength={180} placeholder="Software Engineer" /></label>
        <label>Company<input name="experience_company" maxLength={180} /></label>
        <label>Start date<input name="experience_start" type="date" /></label>
        <label>End date<input name="experience_end" type="date" /></label>
        <label>Description<textarea name="experience_description" maxLength={2000} /></label>
        <label className="details-check"><input name={`experience_current_${key}`} type="checkbox" value="true" /> Currently working here</label>
        {experience.length > 1 && <button className="secondary-button details-remove" type="button" onClick={() => setExperience((rows) => rows.filter((row) => row.key !== key))} aria-label={`Remove experience ${index + 1}`}>Remove</button>}
      </div>)}
      <button className="secondary-button" type="button" onClick={() => add(setExperience)}>＋ Add experience</button>
    </fieldset>

    <fieldset className="details-group wide">
      <legend>Social links</legend>
      {social.map(({ key }, index) => <div className="details-row details-social" key={key}>
        <label>Platform<input name="social_platform" maxLength={80} placeholder="LinkedIn" /></label>
        <label>Profile URL<input name="social_url" type="url" maxLength={500} placeholder="https://..." /></label>
        {social.length > 1 && <button className="secondary-button details-remove" type="button" onClick={() => setSocial((rows) => rows.filter((row) => row.key !== key))} aria-label={`Remove social link ${index + 1}`}>Remove</button>}
      </div>)}
      <button className="secondary-button" type="button" onClick={() => add(setSocial)}>＋ Add social link</button>
    </fieldset>
  </>;
}
