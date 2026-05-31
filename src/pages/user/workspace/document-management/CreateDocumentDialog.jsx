import { useState } from 'react'
import { ExternalLink } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog'

import { CREATE_TYPES } from './data'
import DocIcon from './DocIcon'

const fieldLabel = 'mb-1.5 block text-[13px] font-semibold text-foreground'
const field =
  'w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-[#1d7afc]'

/**
 * Create-document dialog: pick a type (Google Doc / Markdown / Spreadsheet),
 * name it, choose the target Drive folder, then create & open.
 * @param {{ open: boolean, onOpenChange: (open: boolean) => void }} props
 */
const CreateDocumentDialog = ({ open, onOpenChange }) => {
  const [type, setType] = useState('sheet')
  const [name, setName] = useState('')

  const active = CREATE_TYPES.find((t) => t.key === type)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogTitle>Tạo tài liệu mới</DialogTitle>

        <div>
          <span className={fieldLabel}>Loại tài liệu</span>
          <div className="grid grid-cols-3 gap-3">
            {CREATE_TYPES.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setType(t.key)}
                className={cn(
                  'flex flex-col items-center gap-2.5 rounded-xl border px-3 py-4 transition-colors',
                  type === t.key
                    ? 'border-[#1d7afc] bg-[#1d7afc]/[0.06] dark:bg-[#1d7afc]/10'
                    : 'border-border hover:bg-muted',
                )}
              >
                <DocIcon type={t.key} className="size-10" />
                <span className={cn('text-sm font-semibold', type === t.key ? 'text-[#1a6bde] dark:text-[#77affd]' : 'text-foreground')}>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="doc-name" className={fieldLabel}>
            Tên tài liệu
          </label>
          <input id="doc-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ví dụ: API Reference v2" className={field} />
        </div>

        <div>
          <label htmlFor="doc-folder" className={fieldLabel}>
            Thư mục Google Drive
          </label>
          <input id="doc-folder" defaultValue="Web App Team / Frontend Docs" className={field} />
        </div>

        <div className="flex justify-end gap-2">
          <DialogClose className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted">Hủy</DialogClose>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex items-center gap-1.5 rounded-lg bg-[#1d7afc] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1a6bde]"
          >
            Tạo &amp; mở trong {active?.cta}
            <ExternalLink className="size-4" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateDocumentDialog
