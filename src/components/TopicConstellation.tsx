import { useState } from 'react'
import { motion } from 'framer-motion'
import { topicNodes } from '../data/content'

export default function TopicConstellation() {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const highlighted = new Set<string>()
  if (activeNode || hoveredNode) {
    const node = topicNodes.find((n) => n.id === (activeNode || hoveredNode))
    if (node) {
      highlighted.add(node.id)
      node.connections.forEach((c) => highlighted.add(c))
    }
  }

  const getConnections = () => {
    const lines: { x1: number; y1: number; x2: number; y2: number; active: boolean }[] = []
    const seen = new Set<string>()

    for (const node of topicNodes) {
      for (const connId of node.connections) {
        const key = [node.id, connId].sort().join('-')
        if (seen.has(key)) continue
        seen.add(key)

        const target = topicNodes.find((n) => n.id === connId)
        if (!target) continue

        const active =
          highlighted.size === 0 ||
          (highlighted.has(node.id) && highlighted.has(connId))

        lines.push({
          x1: node.x,
          y1: node.y,
          x2: target.x,
          y2: target.y,
          active,
        })
      }
    }
    return lines
  }

  return (
    <div className="relative max-w-lg mx-auto">
      <svg
        viewBox="0 0 100 100"
        className="w-full aspect-square rounded-2xl"
        style={{ background: 'radial-gradient(circle at 50% 50%, #1a3a4a 0%, #0d1f2d 70%)' }}
        role="img"
        aria-label="Interactive topic constellation showing how local issues connect"
      >
        {getConnections().map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={line.active ? '#4ecdc4' : '#3a5a6a'}
            strokeWidth={line.active ? 0.4 : 0.15}
            opacity={line.active ? 0.8 : 0.3}
            animate={{ opacity: line.active ? 0.8 : 0.3 }}
            transition={{ duration: 0.3 }}
          />
        ))}

        {topicNodes.map((node) => {
          const isActive = highlighted.has(node.id)
          const isSelected = activeNode === node.id

          return (
            <g
              key={node.id}
              className="cursor-pointer"
              onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              role="button"
              tabIndex={0}
              aria-label={`Topic: ${node.label}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActiveNode(activeNode === node.id ? null : node.id)
                }
              }}
            >
              {isActive && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={6}
                  fill="none"
                  stroke={node.color}
                  strokeWidth="0.2"
                  initial={{ scale: 0.5, opacity: 0.8 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              )}

              <motion.circle
                cx={node.x}
                cy={node.y}
                r={isSelected ? 4 : 3}
                fill={node.color}
                opacity={highlighted.size === 0 || isActive ? 1 : 0.25}
                animate={{ r: isSelected ? 4 : 3 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />

              <text
                x={node.x}
                y={node.y + (node.y > 50 ? 7 : -5)}
                textAnchor="middle"
                fill="#e8edf2"
                fontSize="3"
                fontFamily="Inter, sans-serif"
                opacity={highlighted.size === 0 || isActive ? 1 : 0.3}
              >
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>

      <p className="text-center text-sm mt-4" style={{ color: 'var(--color-mist)' }}>
        {activeNode
          ? `See how ${topicNodes.find((n) => n.id === activeNode)?.label} connects to other topics`
          : 'Click a topic to see how stories connect'}
      </p>
    </div>
  )
}
