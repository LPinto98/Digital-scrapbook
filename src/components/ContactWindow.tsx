import React, { useRef, useState } from 'react';
import { Linkedin, Mail, Paperclip, Send, X, Heart, CheckCircle2, AlertTriangle } from 'lucide-react';

const LINKEDIN_URL = 'https://linkedin.com/in/larissa-pinto';
const MAX_FILES = 3;
const MAX_TOTAL_BYTES = 8 * 1024 * 1024; // Netlify Forms request limit

type Status = 'idle' | 'sending' | 'sent' | 'error';

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

export const ContactWindow: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalBytes = files.reduce((sum, f) => sum + f.size, 0);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next = [...files];
    for (const file of Array.from(list)) {
      if (next.length >= MAX_FILES) {
        setError(`You can attach up to ${MAX_FILES} files.`);
        break;
      }
      next.push(file);
    }
    if (next.reduce((s, f) => s + f.size, 0) > MAX_TOTAL_BYTES) {
      setError('Attachments must total 8 MB or less.');
      return;
    }
    setFiles(next);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!message.trim()) {
      setError('Please write a message first.');
      return;
    }
    if (totalBytes > MAX_TOTAL_BYTES) {
      setError('Attachments must total 8 MB or less.');
      return;
    }

    const data = new FormData();
    data.append('form-name', 'contact');
    data.append('subject', `New message from ${name || 'a visitor'} via Larissa's Digital Scrapbook`);
    data.append('bot-field', (e.currentTarget.elements.namedItem('bot-field') as HTMLInputElement)?.value ?? '');
    data.append('name', name);
    data.append('email', email);
    data.append('message', message);
    files.forEach((file, i) => data.append(`attachment${i + 1}`, file));

    setStatus('sending');
    try {
      // No Content-Type header: the browser sets the multipart boundary for file uploads.
      const res = await fetch('/__forms.html', { method: 'POST', body: data });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
      setFiles([]);
    } catch {
      setStatus('error');
      setError('Something went wrong sending your message. Please try again.');
    }
  };

  const inputClass =
    'w-full border-2 border-black bg-white px-2 py-1.5 font-pixel text-lg shadow-[2px_2px_0px_black] focus:outline-none focus:bg-pastel-cream';

  return (
    <div className="space-y-4" onMouseDown={(e) => e.stopPropagation()}>
      {/* LinkedIn connect card */}
      <div className="bg-pastel-blue/40 border-4 border-black p-3 shadow-[4px_4px_0px_black] flex flex-col sm:flex-row items-center gap-3">
        <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center shrink-0">
          <Linkedin size={28} className="text-[#0077b5]" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <p className="font-pixel text-xl leading-tight font-bold">LET'S CONNECT ON LINKEDIN!</p>
          <p className="font-pixel text-base text-gray-700 leading-tight">Say hi, swap ideas, or talk opportunities ✨</p>
        </div>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 bg-[#003153] hover:bg-[#00417a] text-white border-4 border-black shadow-[4px_4px_0px_black] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all font-pixel text-lg flex items-center gap-2 shrink-0"
        >
          <Linkedin size={16} /> CONNECT
        </a>
      </div>

      {status === 'sent' ? (
        <div className="border-4 border-black bg-pastel-green/40 p-6 text-center shadow-[4px_4px_0px_black] space-y-3">
          <CheckCircle2 size={40} className="mx-auto text-green-700" />
          <p className="font-pixel text-2xl font-bold">MESSAGE SENT!</p>
          <p className="font-pixel text-lg text-gray-700">Thanks for reaching out — I'll get back to you soon. <Heart size={14} className="inline text-pink-400" fill="currentColor" /></p>
          <button type="button" className="btn-retro" onClick={() => setStatus('idle')}>
            SEND ANOTHER
          </button>
        </div>
      ) : (
        <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" encType="multipart/form-data" onSubmit={handleSubmit} className="space-y-3">
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden">
            <label>
              Don't fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="font-pixel text-lg">YOUR NAME</span>
              <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Ada Lovelace" />
            </label>
            <label className="block">
              <span className="font-pixel text-lg">YOUR EMAIL</span>
              <input type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="you@example.com" />
            </label>
          </div>

          <label className="block">
            <span className="font-pixel text-lg">MESSAGE</span>
            <textarea
              name="message"
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${inputClass} resize-y min-h-[120px]`}
              placeholder="Type your message here..."
            />
          </label>

          <div className="space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={files.length >= MAX_FILES}
                className="px-3 py-1 border-2 border-black bg-pastel-yellow hover:bg-white font-pixel text-lg shadow-[2px_2px_0px_black] flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Paperclip size={14} /> ATTACH FILES
              </button>
              <span className="font-pixel text-sm text-gray-500">
                Up to {MAX_FILES} files • {formatSize(totalBytes)} / 8 MB
              </span>
            </div>
            <input ref={fileInputRef} type="file" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
            {files.length > 0 && (
              <ul className="space-y-1">
                {files.map((file, i) => (
                  <li key={`${file.name}-${i}`} className="flex items-center justify-between border-2 border-black bg-white px-2 py-1 font-pixel text-base">
                    <span className="truncate flex items-center gap-1.5">
                      <Paperclip size={12} /> {file.name} <span className="text-gray-500">({formatSize(file.size)})</span>
                    </span>
                    <button type="button" onClick={() => removeFile(i)} aria-label={`Remove ${file.name}`} className="retro-close-btn hover:bg-red-400 hover:text-white shrink-0 ml-2">
                      <X size={12} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {error && (
            <p className="font-pixel text-lg text-red-600 flex items-center gap-1.5" role="alert">
              <AlertTriangle size={16} /> {error}
            </p>
          )}

          <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
            <span className="font-pixel text-base text-gray-500 flex items-center gap-1">
              <Mail size={14} /> Goes straight to Larissa's inbox
            </span>
            <button type="submit" disabled={status === 'sending'} className="btn-retro bg-pastel-pink flex items-center gap-2 disabled:opacity-60">
              <Send size={16} /> {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
