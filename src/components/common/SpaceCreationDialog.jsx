import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const NAME_MAX = 60
const DESCRIPTION_MAX = 280

const EMPTY_FORM = { name: '', description: '' }

/**
 * Dialog for creating a new workspace (space) from a name + description.
 * Controlled when `open`/`onOpenChange` are provided; otherwise uncontrolled
 * with its own trigger.
 *
 * @param {Object} props
 * @param {boolean} [props.open] - controlled open state
 * @param {(open: boolean) => void} [props.onOpenChange] - controlled open handler
 * @param {(values: { name: string, description: string }) => (void | Promise<void>)} props.onCreate
 *   - called with trimmed values on submit
 * @param {boolean} [props.submitting] - external pending flag (e.g. thunk status)
 * @param {React.ReactNode} [props.trigger] - optional element that opens the dialog
 */
const SpaceCreationDialog = ({ open, onOpenChange, onCreate, submitting = false, trigger }) => {
  const isControlled = open !== undefined
  const [internalOpen, setInternalOpen] = useState(false)
  const isOpen = isControlled ? open : internalOpen

  const [form, setForm] = useState(EMPTY_FORM)

  const setOpen = (next) => {
    if (!isControlled) setInternalOpen(next)
    // Reset on close so the dialog reopens clean.
    if (!next) setForm(EMPTY_FORM)
    onOpenChange?.(next)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const name = form.name.trim()
  const canSubmit = name.length > 0 && name.length <= NAME_MAX && !submitting

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmit) return
    await onCreate?.({ name, description: form.description.trim() })
    setOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {trigger && <DialogTrigger render={trigger} />}

      <DialogContent>
        <DialogHeader className="text-center">
          <DialogTitle>Create a space</DialogTitle>
          <DialogDescription>
            Spaces group your projects, tasks, and chat for a team.
          </DialogDescription>
        </DialogHeader>

        <form id="space-creation-form" onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <div className="flex items-baseline justify-between">
              <Label htmlFor="space-name">Name</Label>
              <span className="text-xs text-muted-foreground">
                {form.name.length}/{NAME_MAX}
              </span>
            </div>
            <Input
              id="space-name"
              name="name"
              required
              autoFocus
              maxLength={NAME_MAX}
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Apollo API"
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-baseline justify-between">
              <Label htmlFor="space-description">
                Description <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <span
                className={cn(
                  'text-xs text-muted-foreground',
                  form.description.length > DESCRIPTION_MAX && 'text-destructive',
                )}
              >
                {form.description.length}/{DESCRIPTION_MAX}
              </span>
            </div>
            <Textarea
              id="space-description"
              name="description"
              rows={3}
              maxLength={DESCRIPTION_MAX}
              value={form.description}
              onChange={handleChange}
              placeholder="What is this space for?"
            />
          </div>
        </form>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={submitting}>
            Cancel
          </Button>
          <Button type="submit" form="space-creation-form" disabled={!canSubmit}>
            {submitting ? 'Creating…' : 'Create space'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SpaceCreationDialog
