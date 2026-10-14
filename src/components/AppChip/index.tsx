import type { ProjectPriority, ProjectStatus } from '../../types'

export type ChipVariant = ProjectPriority | ProjectStatus

interface ChipStyle {
  bg: string
  text: string
  border: string
}

const CHIP_STYLES: Record<ChipVariant, ChipStyle> = {
  // Status
  'On Track': { bg: '#EBFDF2', text: '#027A48', border: '#A6F4C5' },
  'At Risk': { bg: '#FFFAEB', text: '#B54708', border: '#FEDF89' },
  Delayed: { bg: '#FEF3F2', text: '#B42318', border: '#FECDCA' },
  'In Progress': { bg: '#EFF8FF', text: '#175CD3', border: '#B2DDFF' },
  'In Planning': { bg: '#F8F9FA', text: '#344054', border: '#EAECF0' },

  // Priorities
  'High Priority': { bg: '#FEE4E2', text: '#D92D20', border: '#FECDCA' },
  'Medium Priority': { bg: '#FEF0C7', text: '#B54708', border: '#FEDF89' },
  'Low Priority': { bg: '#E0F2FE', text: '#026AA2', border: '#B9E6FE' }
}

interface AppChipProps {
  label: ChipVariant
}

export const AppChip = ({ label }: AppChipProps) => {
  const style = CHIP_STYLES[label] ?? {
    bg: '#F8F9FA',
    text: '#344054',
    border: '#EAECF0'
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
