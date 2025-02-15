import React, { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

export const SplitPane = ({
  left,
  right,
  defaultSplit = 50,
  minSize = 30,
  maxSize = 70,
  className,
}) => {
  const [split, setSplit] = useState(defaultSplit)
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return

      const container = e.currentTarget
      const containerRect = container.getBoundingClientRect()
      const newSplit = ((e.clientX - containerRect.left) / containerRect.width) * 100

      if (newSplit >= minSize && newSplit <= maxSize) {
        setSplit(newSplit)
      }
    },
    [isDragging, minSize, maxSize]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  return (
    <div
      className={cn('flex relative', className)}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="overflow-auto" style={{ width: `${split}%` }}>
        {left}
      </div>

      <div
        className="relative z-10 w-1 cursor-col-resize bg-gray-200 hover:bg-gray-300"
        onMouseDown={handleMouseDown}
      >
        <div className="absolute -inset-x-2 inset-y-0" />
      </div>

      <div className="overflow-auto" style={{ width: `${100 - split}%` }}>
        {right}
      </div>
    </div>
  )
}