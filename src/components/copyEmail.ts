import { homepage } from '../content/site.ts';

type ClipboardWriter = Pick<Clipboard, 'writeText'>;

export async function copyEmailAddress(email: string, clipboard?: ClipboardWriter): Promise<string> {
  try {
    if (!clipboard) throw new Error('Clipboard unavailable');
    await clipboard.writeText(email);
    return homepage.contact.copied;
  } catch {
    return homepage.contact.copyFailed(email);
  }
}
