import React from 'react';

interface FormattedTextProps {
  text: string;
}

export const FormattedMessage: React.FC<FormattedTextProps> = ({ text }) => {
  // Split lines
  const lines = text.split('\n');

  // Helper to parse inline markdown: **bold**, *italic*, [link](url), `code`
  const renderInline = (content: string) => {
    // Regex for bold, code, links
    const parts: React.ReactNode[] = [];
    let remaining = content;
    let keyIdx = 0;

    // We can parse with regex tokenization
    const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\)|https?:\/\/[^\s]+)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }

      const matchText = match[0];
      if (matchText.startsWith('**') && matchText.endsWith('**')) {
        parts.push(
          <strong key={keyIdx++} className="font-semibold text-white">
            {matchText.slice(2, -2)}
          </strong>
        );
      } else if (matchText.startsWith('*') && matchText.endsWith('*')) {
        parts.push(
          <em key={keyIdx++} className="italic text-gray-300">
            {matchText.slice(1, -1)}
          </em>
        );
      } else if (matchText.startsWith('`') && matchText.endsWith('`')) {
        parts.push(
          <code key={keyIdx++} className="font-mono text-[11px] bg-violet-950/70 border border-violet-500/30 px-1 py-0.5 rounded text-cyan-300">
            {matchText.slice(1, -1)}
          </code>
        );
      } else if (matchText.startsWith('[') && matchText.includes('](') && matchText.endsWith(')')) {
        const linkMatch = matchText.match(/\[(.*?)\]\((.*?)\)/);
        if (linkMatch) {
          parts.push(
            <a
              key={keyIdx++}
              href={linkMatch[2]}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors inline-flex items-center gap-0.5"
            >
              {linkMatch[1]}
              <i className="ri-external-link-line text-[10px]" />
            </a>
          );
        } else {
          parts.push(matchText);
        }
      } else if (matchText.startsWith('http')) {
        parts.push(
          <a
            key={keyIdx++}
            href={matchText}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 break-all transition-colors inline-flex items-center gap-0.5"
          >
            {matchText}
            <i className="ri-external-link-line text-[10px]" />
          </a>
        );
      } else {
        parts.push(matchText);
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }

    return parts;
  };

  // Group into paragraphs, bullet lists, headers
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="my-2 space-y-1.5 pl-1">
          {currentList.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-gray-200">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5 shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
              <div className="flex-1">{renderInline(item)}</div>
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    // Bullet item (*, -, •)
    if (/^[-*•]\s+/.test(trimmed)) {
      currentList.push(trimmed.replace(/^[-*•]\s+/, ''));
      return;
    }

    // Numbered item (1. 2.)
    if (/^\d+\.\s+/.test(trimmed)) {
      currentList.push(trimmed.replace(/^\d+\.\s+/, ''));
      return;
    }

    // If we were in a list and hit normal text or empty line, flush
    flushList();

    if (!trimmed) {
      // Empty line -> spacing
      elements.push(<div key={`space-${idx}`} className="h-1.5" />);
      return;
    }

    // Header style (**Heading:** or ### Heading)
    if (/^###\s+/.test(trimmed) || /^##\s+/.test(trimmed)) {
      elements.push(
        <div key={`h-${idx}`} className="font-bold text-white text-xs sm:text-sm mt-2 mb-1 text-cyan-300">
          {renderInline(trimmed.replace(/^#+\s+/, ''))}
        </div>
      );
      return;
    }

    // Normal paragraph
    elements.push(
      <p key={`p-${idx}`} className="leading-relaxed">
        {renderInline(trimmed)}
      </p>
    );
  });

  flushList();

  return <div className="space-y-1 text-xs sm:text-sm">{elements}</div>;
};

export default FormattedMessage;
