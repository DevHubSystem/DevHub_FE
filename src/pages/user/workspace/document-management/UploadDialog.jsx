import { useRef, useState } from 'react'
import { CheckCircle2, UploadCloud } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog'

import { RECENT_UPLOADS } from './data'
import DocIcon from './DocIcon'

const TABS = ['Từ máy tính', 'Từ Google Drive']

/**
 * Upload-document dialog: drag/drop or pick a local file, or import from Drive.
 * @param {{ open: boolean, onOpenChange: (open: boolean) => void }} props
 */
const UploadDialog = ({ open, onOpenChange }) => {
  const [tab, setTab] = useState(TABS[0])
  const inputRef = useRef(null)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogTitle>Tải tài liệu lên</DialogTitle>

        <div className="-mt-1 flex items-center gap-5 border-b border-border">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                'relative -mb-px py-2 text-sm font-semibold transition-colors',
                tab === t
                  ? "text-foreground after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded after:bg-[#1d7afc] after:content-['']"
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === TABS[0] ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border px-6 py-10 text-center">
            <UploadCloud className="size-9 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Kéo file vào đây hoặc</p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Chọn file từ máy tính
            </button>
            <input ref={inputRef} type="file" multiple accept=".pdf,.docx,.md,.png,.jpg,.jpeg" className="hidden" />
            <p className="text-[12.5px] text-muted-foreground">Hỗ trợ: PDF, DOCX, MD, PNG, JPG (tối đa 25MB)</p>
          </div>
        ) : (
          <div className="rounded-xl border-2 border-dashed border-border px-6 py-10 text-center">
            <p className="text-sm text-muted-foreground">Kết nối Google Drive để nhập tài liệu có sẵn.</p>
            <button type="button" className="mt-3 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
              Kết nối Google Drive
            </button>
          </div>
        )}

        {RECENT_UPLOADS.length > 0 && (
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.06em] text-muted-foreground">Vừa tải lên</p>
            <ul className="flex flex-col gap-2">
              {RECENT_UPLOADS.map((f) => (
                <li key={f.id} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2.5">
                  <DocIcon type={f.type} className="size-8" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-foreground">{f.name}</span>
                    <span className="block text-[12px] text-muted-foreground">
                      {f.size} · {f.date}
                    </span>
                  </span>
                  <CheckCircle2 className="size-5 shrink-0 text-[#16a34a] dark:text-[#4ade80]" />
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end">
          <DialogClose className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90">Đóng</DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UploadDialog
