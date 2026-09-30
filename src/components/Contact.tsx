import { copyEmailAddress } from './copyEmail';
import { useState } from 'react';
import { profile } from '../content/portfolio';
import { Button, Heading } from './ui';

export function Contact() {
  const [feedback, setFeedback] = useState('');
  const [copying, setCopying] = useState(false);
  async function copyEmail() {
    setCopying(true);
    setFeedback('Copying email…');
    setFeedback(await copyEmailAddress(profile.email, navigator.clipboard));
    setCopying(false);
  }
  return <section id="contact" className="section contact-section" aria-labelledby="contact-title" tabIndex={-1}>
    <Heading id="contact-title" eyebrow="04 / Contact">Let’s build something useful.</Heading>
    <p className="lede">Have a project or an idea to discuss? Get in touch.</p>
    <div className="actions">
      <a className="text-link email-link" href={`mailto:${profile.email}`}>{profile.email} <span aria-hidden="true">↗</span></a>
      <Button onClick={copyEmail} disabled={copying}>Copy email</Button>
    </div>
    <p className="copy-feedback" role="status" aria-live="polite" aria-atomic="true">{feedback}</p>
  </section>;
}
