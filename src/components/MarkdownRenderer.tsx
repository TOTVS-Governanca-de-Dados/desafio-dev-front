import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  return (
    <div className={`markdown-content ${className || ""}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold mb-4 text-zinc-100">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold mb-3 text-zinc-100">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-bold mb-2 text-zinc-100">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="mb-3 text-zinc-200 leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-3 text-zinc-200 space-y-1">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-3 text-zinc-200 space-y-1">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="text-zinc-200">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-zinc-600 pl-4 italic text-zinc-300 mb-3">
              {children}
            </blockquote>
          ),
          code: (props) => {
            const { inline, className, children } = props as {
              inline: boolean;
              className: string;
              children: React.ReactNode;
            };
            return !inline ? (
              <pre className="bg-zinc-800 rounded-lg p-4 overflow-x-auto mb-3">
                <code className={className}>{children}</code>
              </pre>
            ) : (
              <code className="bg-zinc-800 px-1 py-0.5 rounded text-sm font-mono text-zinc-200">
                {children}
              </code>
            );
          },
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-blue-400 hover:text-blue-300 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-zinc-100">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-zinc-200">{children}</em>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-3">
              <table className="min-w-full border-collapse border border-zinc-600">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-zinc-600 px-3 py-2 bg-zinc-700 text-zinc-100 font-semibold text-left">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-zinc-600 px-3 py-2 text-zinc-200">
              {children}
            </td>
          ),
          hr: () => <hr className="border-zinc-600 my-4" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
