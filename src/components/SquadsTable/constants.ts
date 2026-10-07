import type { StatusType } from '../../types'

export const AVAILABLE_STATUSES: StatusType[] = [
  'On Track',
  'At Risk',
  'Delayed'
]

export const STATUS_STYLES: Record<
  StatusType,
  { bg: string; text: string; dot: string; border: string }
> = {
  'On Track': {
    bg: '#e8f5e9',
    text: '#2e7d32',
    dot: '#2e7d32',
    border: '#a5d6a7'
  },
  'At Risk': {
    bg: '#fff8e1',
    text: '#ed6c02',
    dot: '#ed6c02',
    border: '#ffe082'
  },
  Delayed: {
    bg: '#fdeeed',
    text: '#d32f2f',
    dot: '#d32f2f',
    border: '#ef9a9a'
  }
}
