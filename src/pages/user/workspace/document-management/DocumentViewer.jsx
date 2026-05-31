import { Share2 } from 'lucide-react'

import { cn } from '@/lib/utils'

import { DOC_MENU } from './data'
import DocIcon from './DocIcon'

const sourceBadge = 'rounded px-1.5 py-0.5 text-[11px] font-semibold bg-[#e7f0ff] text-[#1a6bde] dark:bg-[#1d7afc]/15 dark:text-[#77affd]'

/**
 * Document content surface: title header with source/sync status + share action,
 * an editor-style menubar, and the embedded document body. A real Drive/Docs
 * file renders through `doc.embedUrl` (iframe); otherwise a preview is shown.
 * @param {{ doc: object }} props
 */
const DocumentViewer = ({ doc }) => {
  if (!doc) {
    return (
      <div className="mt-4 grid flex-1 place-items-center rounded-xl border border-dashed border-[#cdd5e0] py-20 text-center dark:border-white/10">
        <p className="text-sm text-[#8b95a4] dark:text-[#6b7684]">Chọn một tài liệu để xem nội dung.</p>
      </div>
    )
  }

  return (
    <div className="mt-4 flex min-h-160 flex-col overflow-hidden rounded-xl border border-[#e3e7ee] bg-white dark:border-white/[0.07] dark:bg-[#151a21]">
      <div className="flex items-center gap-3 border-b border-[#e3e7ee] px-5 py-3.5 dark:border-white/[0.07]">
        <DocIcon type={doc.type} className="size-9" />
        <h2 className="text-base font-bold tracking-[-0.2px] text-[#1a1f29] dark:text-[#e7edf4]">{doc.name}</h2>
        <span className={sourceBadge}>{doc.source}</span>
        {doc.synced && (
          <span className="flex items-center gap-1.5 text-[12.5px] font-medium text-[#16a34a] dark:text-[#4ade80]">
            <span className="size-1.5 rounded-full bg-current" />
            Đã đồng bộ
          </span>
        )}
        <button
          type="button"
          className="ml-auto flex items-center gap-1.5 rounded-lg border border-[#e3e7ee] px-3 py-1.5 text-[13px] font-semibold text-[#1a1f29] transition-colors hover:bg-[#eef1f5] dark:border-white/[0.07] dark:text-[#e7edf4] dark:hover:bg-[#1e242d]"
        >
          <Share2 className="size-4" />
          Chia sẻ
        </button>
      </div>

      <div className="flex items-center gap-5 border-b border-[#e3e7ee] px-5 py-2 dark:border-white/[0.07]">
        {DOC_MENU.map((m) => (
          <button
            key={m}
            type="button"
            className="text-[13px] text-[#4b5564] transition-colors hover:text-[#1a1f29] dark:text-[#aeb8c4] dark:hover:text-[#e7edf4]"
          >
            {m}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto bg-[#f1f3f6] p-6 dark:bg-[#0f1318]">
        {doc.embedUrl ? (
          <iframe src={doc.embedUrl} title={doc.name} className="h-full min-h-150 w-full rounded-lg border-0 bg-white" />
        ) : (
          <article className="mx-auto max-w-200 rounded-lg bg-white px-12 py-12 shadow-sm dark:bg-[#1b2129]">
            <h1 className="text-3xl font-extrabold tracking-[-0.4px] text-[#1a1f29] dark:text-[#e7edf4]">{doc.name} — Web App Frontend</h1>
            <h3 className="mt-8 text-xl font-bold text-[#1a1f29] dark:text-[#e7edf4]">Tổng quan hệ thống</h3>
            <p className="mt-3 text-[15px] leading-7 text-[#4b5564] dark:text-[#aeb8c4]">
              Ứng dụng sử dụng kiến trúc React SPA với API backend Node.js. Authentication được xử lý qua OAuth 2.0, dữ liệu đồng bộ thời gian
              thực qua WebSocket.
            </p>
            <h3 className="mt-8 text-xl font-bold text-[#1a1f29] dark:text-[#e7edf4]">Cấu trúc thư mục</h3>
            <pre className={cn('mt-3 overflow-x-auto rounded-lg bg-[#f7f8fa] p-4 text-[13px] leading-6 text-[#4b5564]', 'dark:bg-[#0f1318] dark:text-[#aeb8c4]')}>
              {`src/
  components/   # UI components
  feature/      # Redux slices
  pages/        # Route pages
  service/      # API clients`}
            </pre>
          </article>
        )}
      </div>
    </div>
  )
}

export default DocumentViewer
