"use client";

import { useState } from "react";
import type { PortfolioEducation, PortfolioExperience, PortfolioSocialLink } from "@/components/portfolio-templates/types";
import { FieldError } from "./PortfolioForm";

type Row<T> = { key: string; value?: T };

type Props = { educationData?: (PortfolioEducation & { id?: string })[]; experienceData?: (PortfolioExperience & { id?: string })[]; socialData?: (PortfolioSocialLink & { id?: string })[] };

export default function PortfolioDetailsFields({ educationData = [], experienceData = [], socialData = [] }: Props) {
  const [education, setEducation] = useState<Row<PortfolioEducation & { id?: string }>[]>(educationData.length ? educationData.map((value, index) => ({ key: value.id || `education-${index}`, value })) : [{ key: "education-new-0" }]);
  const [experience, setExperience] = useState<Row<PortfolioExperience & { id?: string }>[]>(experienceData.length ? experienceData.map((value, index) => ({ key: value.id || `experience-${index}`, value })) : [{ key: "experience-new-0" }]);
  const [social, setSocial] = useState<Row<PortfolioSocialLink & { id?: string }>[]>(socialData.length ? socialData.map((value, index) => ({ key: value.id || `social-${index}`, value })) : [{ key: "social-new-0" }]);
  const [nextKey, setNextKey] = useState(education.length + experience.length + social.length);

  function add<T>(setRows: (rows: Row<T>[] | ((current: Row<T>[]) => Row<T>[])) => void, prefix: string) {
    const key = `${prefix}-${nextKey}`;
    setNextKey((value) => value + 1);
    setRows((rows) => [...rows, { key }]);
  }

  return <>
    <fieldset className="details-group wide">
      <legend>Education <span>(Optional)</span></legend>
      {education.map(({ key, value }, index) => <div className="details-row" key={key}>
        <input type="hidden" name="education_row_key" value={key} />
        {value?.id && <input type="hidden" name={`education_id_${key}`} value={value.id} />}
        <label>School<input name="education_school" maxLength={180} defaultValue={value?.school} /></label>
        <label>Degree<input name="education_degree" maxLength={180} placeholder="Bachelor’s degree" defaultValue={value?.degree ?? ""} /></label>
        <label>Field of study<input name="education_field" maxLength={180} placeholder="Information Technology" defaultValue={value?.field_of_study ?? ""} /></label>
        <label>Start date<input name="education_start" type="date" defaultValue={value?.start_date ?? ""} /></label>
        <label>End date<input name="education_end" type="date" defaultValue={value?.end_date ?? ""} /></label>
        <label>Description<textarea name="education_description" maxLength={2000} defaultValue={value?.description ?? ""} /></label>
        <label className="details-check"><input name={`education_current_${key}`} type="checkbox" value="true" defaultChecked={value?.currently_studying} /> Currently studying</label>
        <button className="secondary-button details-remove" type="button" onClick={() => setEducation((rows) => rows.filter((row) => row.key !== key))} aria-label={`Remove education ${index + 1}`}>REMOVE</button>
      </div>)}
      <button className="secondary-button" type="button" onClick={() => add(setEducation, "education")}>＋ Add education</button>
    </fieldset>

    <fieldset className="details-group wide">
      <legend>Work Experience <span>(Optional)</span></legend>
      {experience.map(({ key, value }, index) => <div className="details-row" key={key}>
        <input type="hidden" name="experience_row_key" value={key} />
        {value?.id && <input type="hidden" name={`experience_id_${key}`} value={value.id} />}
        <label>Position<input name="experience_position" maxLength={180} placeholder="Software Engineer" defaultValue={value?.position} /></label>
        <label>Company<input name="experience_company" maxLength={180} defaultValue={value?.company ?? ""} /></label>
        <label>Start date<input name="experience_start" type="date" defaultValue={value?.start_date ?? ""} /></label>
        <label>End date<input name="experience_end" type="date" defaultValue={value?.end_date ?? ""} /></label>
        <label>Description<textarea name="experience_description" maxLength={2000} defaultValue={value?.description ?? ""} /></label>
        <label className="details-check"><input name={`experience_current_${key}`} type="checkbox" value="true" defaultChecked={value?.currently_working} /> Currently working here</label>
        <button className="secondary-button details-remove" type="button" onClick={() => setExperience((rows) => rows.filter((row) => row.key !== key))} aria-label={`Remove experience ${index + 1}`}>REMOVE</button>
      </div>)}
      <button className="secondary-button" type="button" onClick={() => add(setExperience, "experience")}>＋ Add experience</button>
    </fieldset>

    <fieldset className="details-group wide">
      <legend>Social Links <span>(Optional)</span></legend>
      {social.map(({ key, value }, index) => <div className="details-row details-social" key={key}>
        <input type="hidden" name="social_row_key" value={key} />
        {value?.id && <input type="hidden" name={`social_id_${key}`} value={value.id} />}
        <label>Platform<input name="social_platform" maxLength={80} placeholder="LinkedIn" defaultValue={value?.platform} /><FieldError field={`social_platform.${index}`} /></label>
        <label>Profile URL<input name="social_url" type="text" inputMode="url" maxLength={500} placeholder="https://..." defaultValue={value?.url} aria-describedby={`social-url-help-${key}`} /><small className="upload-help" id={`social-url-help-${key}`}>Enter a full address beginning with https://.</small><FieldError field={`social_url.${index}`} /></label>
        <button className="secondary-button details-remove" type="button" onClick={() => setSocial((rows) => rows.filter((row) => row.key !== key))} aria-label={`Remove social link ${index + 1}`}>REMOVE</button>
      </div>)}
      <button className="secondary-button" type="button" onClick={() => add(setSocial, "social")}>＋ Add social link</button>
    </fieldset>
  </>;
}
