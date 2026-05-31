// Mock documents for the workspace Docs view. `group` drives the picker filter:
// 'drive' = synced Google Drive files, 'upload' = files uploaded to DevHub.
export const DOCUMENTS = [
  { id: 'arch', name: 'Architecture Docs', type: 'drive', source: 'Google Docs', badge: 'Drive', group: 'drive', modified: 'Sửa đổi 2 giờ trước', synced: true },
  { id: 'api', name: 'API Specs', type: 'drive', source: 'Google Docs', badge: 'Drive', group: 'drive', modified: 'Sửa đổi hôm qua', synced: true },
  { id: 'guide', name: 'User Guide', type: 'drive', source: 'Google Docs', badge: 'Drive', group: 'drive', modified: 'Sửa đổi 3 ngày trước', synced: true },
  { id: 'erd', name: 'erd-diagram.pdf', type: 'pdf', source: 'PDF', badge: 'Tải lên', group: 'upload', modified: '26 thg 5, 2026' },
  { id: 'readme', name: 'README.md', type: 'md', source: 'Markdown', badge: 'Tải lên', group: 'upload', modified: '24 thg 5, 2026' },
]

// Picker filter chips.
export const DOC_FILTERS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'drive', label: 'Google Drive' },
  { key: 'upload', label: 'Đã tải lên' },
]

// Document-content menubar (mock Google Docs / editor chrome).
export const DOC_MENU = ['Chỉnh sửa', 'Xem', 'Chèn', 'Định dạng', 'Công cụ']

// Recently uploaded files shown in the upload dialog.
export const RECENT_UPLOADS = [{ id: 'erd', name: 'erd-diagram.pdf', type: 'pdf', size: '245 KB', date: '26 thg 5, 2026' }]

// Document types offered by the "create" dialog. `cta` is the open-target label.
export const CREATE_TYPES = [
  { key: 'gdoc', label: 'Google Doc', cta: 'Docs' },
  { key: 'md', label: 'Markdown', cta: 'trình soạn thảo' },
  { key: 'sheet', label: 'Spreadsheet', cta: 'Sheets' },
]
