import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "@portabletext/react";
import { highlight } from "sugar-high";
import { SmartImage } from "./smart-image";

type CodeValue = { code: string; language?: string; filename?: string };

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <code className="prose-inline-code">{children}</code>,
    link: ({ children, value }) => {
      const href = (value as { href?: string })?.href ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => (
      <figure className="prose-figure">
        <SmartImage
          image={value}
          width={1200}
          height={800}
          sizes="(max-width: 768px) 100vw, 720px"
          className="prose-image"
        />
        {value?.caption ? (
          <figcaption>{value.caption}</figcaption>
        ) : null}
      </figure>
    ),
    code: ({ value }) => {
      const v = value as CodeValue;
      if (!v?.code) return null;
      return (
        <figure className="code-block">
          {v.filename ? (
            <figcaption className="code-filename">{v.filename}</figcaption>
          ) : null}
          <pre>
            <code
              className="sh"
              dangerouslySetInnerHTML={{ __html: highlight(v.code) }}
            />
          </pre>
        </figure>
      );
    },
  },
};

export function RichText({ value }: { value: PortableTextBlock[] | undefined }) {
  if (!value?.length) return null;
  return (
    <div className="prose">
      <PortableText value={value} components={components} />
    </div>
  );
}
