import { copyEmailAddress } from './copyEmail';
import { useState } from 'react';
import { homepage, profile, ui } from '../content/site';
import { Button, Heading } from './ui';
import { Entrance } from './Motion';

export function Contact() {
  const [feedback, setFeedback] = useState('');
  const [copying, setCopying] = useState(false);
  async function copyEmail() {
    setCopying(true);
    setFeedback(homepage.contact.copying);
    setFeedback(await copyEmailAddress(profile.email, navigator.clipboard));
    setCopying(false);
  }
  return <section id="contact" className="section contact-section" aria-labelledby="contact-title" tabIndex={-1}>
    <Entrance><Heading id="contact-title" eyebrow={homepage.contact.eyebrow}>{homepage.contact.title}</Heading></Entrance>
    <p className="lede">{homepage.contact.lede}</p>
    <div className="actions">
      <a className="text-link email-link" href={`mailto:${profile.email}`}>{profile.email} <span aria-hidden="true">{ui.external}</span></a>
      <Button onClick={copyEmail} disabled={copying}>{homepage.contact.copyButton}</Button>
    </div>
    <p className="copy-feedback" role="status" aria-live="polite" aria-atomic="true">{feedback}</p>
  </section>;
}
