import { FiFileText, FiUpload, FiTrash2 } from "react-icons/fi";

interface ContextUploaderProps {
  contextDocName: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveContext: () => void;
}

export function ContextUploader({
  contextDocName,
  fileInputRef,
  onFileUpload,
  onRemoveContext,
}: ContextUploaderProps) {
  return (
    <div className="mb-6">
      {/* Upload area or Context document info */}
      <div className="border border-zinc-700 rounded-lg p-3 bg-zinc-800/50">
        <input
          type="file"
          accept=".md,.txt"
          ref={fileInputRef}
          onChange={onFileUpload}
          className="hidden"
          id="context-upload"
        />

        {contextDocName ? (
          <>
            <div className="flex items-center justify-between mb-2 min-w-0">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <FiFileText size={14} className="text-blue-400 flex-shrink-0" />
                <span className="text-sm text-zinc-200 font-medium truncate">
                  {contextDocName}
                </span>
              </div>
              <button
                onClick={onRemoveContext}
                className="text-red-400 hover:text-red-300 text-xs p-1 rounded transition flex-shrink-0 ml-2"
                title="Remove document"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              The content of this document will be used to answer your
              questions.
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-4">
            <FiFileText size={24} className="text-zinc-500 mb-2" />
            <p className="text-xs text-zinc-500 mb-2 text-center">
              Upload a document to provide context for the conversation
            </p>
            <p className="text-xs text-zinc-600 mb-3 text-center">
              Accepted formats: .md, .txt
            </p>
            <label
              htmlFor="context-upload"
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded cursor-pointer text-xs font-semibold transition"
              title="Upload document"
            >
              <FiUpload size={16} />
              Upload Document
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
