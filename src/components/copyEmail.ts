type ClipboardWriter = Pick<Clipboard, 'writeText'>;

export async function copyEmailAddress(email: string, clipboard?: ClipboardWriter): Promise<string> {
  try {
    if (!clipboard) throw new Error('Clipboard unavailable');
    await clipboard.writeText(email);
    return 'Email copied to clipboard.';
  } catch {
    return `Couldn’t copy automatically. Select and copy ${email}, or use the email link.`;
  }
}
