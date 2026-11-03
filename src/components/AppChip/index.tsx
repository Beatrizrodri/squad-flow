import type { ProjectPriority, ProjectStatus } from '../../types'

export type ChipVariant = ProjectPriority | ProjectStatus

interface ChipStyle {
  bg: string
  text: string
  border: string
}

const CHIP_STYLES: Record<ChipVariant, ChipStyle> = {
  'On Track': {
    bg: 'var(--status-success-bg)',
    text: 'var(--status-success-text)',
    border: 'var(--status-success-border)'
  },
  'At Risk': {
    bg: 'var(--status-warning-bg)',
    text: 'var(--status-warning-text)',
    border: 'var(--status-warning-border)'
  },
  Delayed: {
    bg: 'var(--status-danger-bg)',
    text: 'var(--status-danger-text)',
    border: 'var(--status-danger-border)'
  },
  'In Progress': {
    bg: 'var(--status-info-bg)',
    text: 'var(--status-info-text)',
    border: 'var(--status-info-border)'
  },
  'In Planning': {
    bg: 'var(--status-neutral-bg)',
    text: 'var(--status-neutral-text)',
    border: 'var(--status-neutral-border)'
  },

  'High Priority': {
    bg: 'var(--status-danger-bg)',
    text: 'var(--status-danger-text)',
    border: 'var(--status-danger-border)'
  },
  'Medium Priority': {
    bg: 'var(--status-warning-bg)',
    text: 'var(--status-warning-text)',
    border: 'var(--status-warning-border)'
  },
  'Low Priority': {
    bg: 'var(--status-info-bg)',
    text: 'var(--status-info-text)',
    border: 'var(--status-info-border)'
  }
}

interface AppChipProps {
  label: ChipVariant
}

export const AppChip = ({ label }: AppChipProps) => {
  const style = CHIP_STYLES[label] ?? {
    bg: 'var(--status-neutral-bg)',
    text: 'var(--status-neutral-text)',
    border: 'var(--status-neutral-border)'
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: 500,
        backgroundColor: style.bg,
        color: style.text,
        border: `1px solid ${style.border}`,
        lineHeight: '1.4',
        whiteSpace: 'nowrap',
        width: 'fit-content'
      }}
    >
      {label}
    </span>
  )
}
