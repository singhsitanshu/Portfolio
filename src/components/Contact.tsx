import { copyEmailAddress } from './copyEmail';
import { useState } from 'react';
import { homepage, profile } from '../content/site';
import { SectionFront } from './print';

// Contact as a classified ad (T-12): "Wanted", the existing invitation, the
// email address, and Copy email with spoken feedback.
export function Contact() {
  const [feedback, setFeedback] = useState('');
  const [copying, setCopying] = useState(false);
  const copy = homepage.contact;
  async function copyEmail() {
    setCopying(true);
    setFeedback(copy.copying);
    setFeedback(await copyEmailAddress(profile.email, navigator.clipboard));
    setCopying(false);
  }
  return <section id="contact" className="classifieds" aria-labelledby="contact-title" tabIndex={-1}>
    <SectionFront id="classifieds-title" aside={copy.sectionAside}>{copy.section}</SectionFront>
    <div className="classified">
      <h3 className="classified-head" id="contact-title">{copy.heading}</h3>
      <p className="headline-secondary">{copy.title}</p>
      <p className="classified-lede">{copy.lede}</p>
      <p className="classified-reply"><span className="label">{copy.replyLabel}</span> <a className="classified-email" href={`mailto:${profile.email}`}>{profile.email}</a></p>
      <button type="button" className="print-button" onClick={copyEmail} disabled={copying}>{copy.copyButton}</button>
      <p className="copy-feedback" role="status" aria-live="polite" aria-atomic="true">{feedback}</p>
    </div>
  </section>;
}
