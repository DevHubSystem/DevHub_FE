import { useState } from 'react'
import { Plus, Upload } from 'lucide-react'

import { DOCUMENTS } from './data'
import CreateDocumentDialog from './CreateDocumentDialog'
import DocumentPicker from './DocumentPicker'
import DocumentViewer from './DocumentViewer'
import UploadDialog from './UploadDialog'

/**
 * Workspace "Docs" view — pick/search a document, view its content, and
 * upload or create new documents via dialogs.
 */
const DocumentManagement = () => {
  const [selectedId, setSelectedId] = useState(DOCUMENTS[0].id)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)

  const selected = DOCUMENTS.find((d) => d.id === selectedId)

  return (
    <section className="px-6 py-5">
      <div className="flex items-center gap-3">
        <span className="shrink-0 text-base font-bold tracking-[-0.2px] text-[#1a1f29] dark:text-[#e7edf4]">Tài liệu</span>
        <DocumentPicker documents={DOCUMENTS} selectedId={selectedId} onSelect={setSelectedId} />

        <button
          type="button"
          onClick={() => setUploadOpen(true)}
          title="Tải tài liệu lên"
          className="ml-auto grid size-10 shrink-0 place-items-center rounded-lg border border-[#e3e7ee] text-[#4b5564] transition-colors hover:bg-[#eef1f5] hover:text-[#1a1f29] dark:border-white/[0.07] dark:text-[#aeb8c4] dark:hover:bg-[#1e242d] dark:hover:text-[#e7edf4]"
        >
          <Upload className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          title="Tạo tài liệu mới"
          className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#1d7afc] text-white transition-colors hover:bg-[#1a6bde]"
        >
          <Plus className="size-5" />
        </button>
      </div>

      <DocumentViewer doc={selected} />

      <UploadDialog open={uploadOpen} onOpenChange={setUploadOpen} />
      <CreateDocumentDialog open={createOpen} onOpenChange={setCreateOpen} />
    </section>
  )
}

export default DocumentManagement
