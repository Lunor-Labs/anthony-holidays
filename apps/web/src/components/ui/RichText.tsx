import React from "react";
import Link from "next/link";

interface RichTextProps {
  content: any;
  className?: string;
}

// Lexical format bitmask constants
const IS_BOLD = 1;
const IS_ITALIC = 1 << 1;
const IS_STRIKETHROUGH = 1 << 2;
const IS_UNDERLINE = 1 << 3;
const IS_CODE = 1 << 4;

function renderTextNode(node: any, key: number | string) {
  let text = node.text || "";
  const format = node.format || 0;

  let element: React.ReactNode = text;

  if (format & IS_CODE) {
    element = (
      <code key={key} className="bg-cream/50 px-1.5 py-0.5 rounded text-xs font-mono text-forest">
        {element}
      </code>
    );
  }
  if (format & IS_BOLD) {
    element = <strong key={key} className="font-semibold text-charcoal">{element}</strong>;
  }
  if (format & IS_ITALIC) {
    element = <em key={key} className="italic">{element}</em>;
  }
  if (format & IS_UNDERLINE) {
    element = <u key={key} className="underline">{element}</u>;
  }
  if (format & IS_STRIKETHROUGH) {
    element = <s key={key} className="line-through">{element}</s>;
  }

  return <React.Fragment key={key}>{element}</React.Fragment>;
}

function renderNode(node: any, index: number): React.ReactNode {
  if (!node) return null;

  // Text leaf node
  if (node.type === "text") {
    return renderTextNode(node, index);
  }

  // Children rendering
  const children = Array.isArray(node.children)
    ? node.children.map((child: any, i: number) => renderNode(child, i))
    : null;

  switch (node.type) {
    case "paragraph":
      return (
        <p key={index} className="mb-7 text-stone leading-relaxed font-normal text-base sm:text-lg">
          {children}
        </p>
      );

    case "heading": {
      const tag = node.tag || "h2";
      if (tag === "h1" || tag === "h2") {
        return (
          <h2 key={index} className="font-serif text-2xl sm:text-3xl text-forest mt-12 mb-4 font-normal">
            {children}
          </h2>
        );
      }
      return (
        <h3 key={index} className="font-serif text-xl sm:text-2xl text-forest mt-8 mb-3 font-normal">
          {children}
        </h3>
      );
    }

    case "quote":
      return (
        <blockquote
          key={index}
          className="border-l-2 border-gold pl-7 my-10 font-serif italic text-xl text-forest bg-gold/5 py-4 pr-4"
        >
          {children}
        </blockquote>
      );

    case "list": {
      if (node.listType === "number") {
        return (
          <ol key={index} className="list-decimal pl-6 space-y-2 mb-7 text-stone text-base sm:text-lg font-normal">
            {children}
          </ol>
        );
      }
      return (
        <ul key={index} className="list-disc pl-6 space-y-2 mb-7 text-stone text-base sm:text-lg font-normal">
          {children}
        </ul>
      );
    }

    case "listitem":
      return (
        <li key={index} className="leading-relaxed">
          {children}
        </li>
      );

    case "link": {
      const href = node.fields?.url || node.url || "#";
      const isExternal = href.startsWith("http");
      if (isExternal) {
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-forest underline hover:text-gold transition-colors font-medium"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          key={index}
          href={href}
          className="text-forest underline hover:text-gold transition-colors font-medium"
        >
          {children}
        </Link>
      );
    }

    default:
      if (children) {
        return <div key={index}>{children}</div>;
      }
      return null;
  }
}

export function RichText({ content, className = "" }: RichTextProps) {
  if (!content) return null;

  // Case 1: Plain text string (from fallback or simple text input)
  if (typeof content === "string") {
    const paragraphs = content
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);

    return (
      <div className={`rich-text space-y-4 ${className}`}>
        {paragraphs.map((p, idx) => {
          // Heading markdown syntax
          if (p.startsWith("### ")) {
            return (
              <h3 key={idx} className="font-serif text-xl sm:text-2xl text-forest mt-8 mb-3 font-normal">
                {p.replace(/^###\s+/, "")}
              </h3>
            );
          }
          if (p.startsWith("## ") || p.startsWith("# ")) {
            return (
              <h2 key={idx} className="font-serif text-2xl sm:text-3xl text-forest mt-12 mb-4 font-normal">
                {p.replace(/^#{1,2}\s+/, "")}
              </h2>
            );
          }
          // Blockquote syntax
          if (p.startsWith("> ")) {
            return (
              <blockquote
                key={idx}
                className="border-l-2 border-gold pl-7 my-10 font-serif italic text-xl text-forest bg-gold/5 py-4 pr-4"
              >
                {p.replace(/^>\s+/, "")}
              </blockquote>
            );
          }
          return (
            <p key={idx} className="mb-7 text-stone leading-relaxed font-normal text-base sm:text-lg">
              {p}
            </p>
          );
        })}
      </div>
    );
  }

  // Case 2: Lexical JSON AST from Payload CMS
  if (content && typeof content === "object") {
    // If wrapped in root
    const rootNodes = content.root?.children || content.children;
    if (Array.isArray(rootNodes)) {
      return (
        <div className={`rich-text ${className}`}>
          {rootNodes.map((node: any, idx: number) => renderNode(node, idx))}
        </div>
      );
    }
  }

  return null;
}
