import type { StatusType } from '../../types'

export const AvailableStatus: StatusType[] = ['On Track', 'At Risk', 'Delayed']

export const StatusStyles: Record<
  StatusType,
  { bg: string; text: string; dot: string; border: string }
> = {
  'On Track': {
    bg: 'var(--status-success-bg)',
    text: 'var(--status-success-text)',
    dot: 'var(--status-success-dot)',
    border: 'var(--status-success-border)'
  },
  'At Risk': {
    bg: 'var(--status-warning-bg)',
    text: 'var(--status-warning-text)',
    dot: 'var(--status-warning-dot)',
    border: 'var(--status-warning-border)'
  },
  Delayed: {
    bg: 'var(--status-danger-bg)',
    text: 'var(--status-danger-text)',
    dot: 'var(--status-danger-dot)',
    border: 'var(--status-danger-border)'
  }
}
