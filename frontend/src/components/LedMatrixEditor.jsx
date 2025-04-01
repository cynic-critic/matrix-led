import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

const GRID_SIZE = 15
const ROW_LABELS = [...'ABCDEFGHIJKLMNO'] // 15 rows → A to O

export default function LedMatrixEditor() {
  const [matrix, setMatrix] = useState({})
  const [drawing, setDrawing] = useState(false)
  const [drawOrder, setDrawOrder] = useState(0)
  const [locked, setLocked] = useState(false)
  const [colorPicker, setColorPicker] = useState({ key: null, visible: false })

  const toLogicalKey = (row, col) => `${ROW_LABELS[row]}${col + 1}`

  const handleCellClick = (row, col) => {
    const key = toLogicalKey(row, col)

    if (drawing && !locked) {
      if (matrix[key]) return // skip if already active

      setMatrix(prev => ({
        ...prev,
        [key]: {
          active: true,
          order: drawOrder + 1,
          color: '#ffffff' // default color
        }
      }))
      setDrawOrder(prev => prev + 1)
    }

    if (!drawing && locked && matrix[key]?.active) {
      setColorPicker({ key, visible: true })
    }
  }

  const handleColorChange = (e) => {
    const newColor = e.target.value
    const key = colorPicker.key
    if (key) {
      setMatrix(prev => ({
        ...prev,
        [key]: {
          ...prev[key],
          color: newColor
        }
      }))
    }
    setColorPicker({ key: null, visible: false })
  }

  const handleDrawLine = () => {
    setDrawing(true)
    setLocked(false)
    setMatrix({})
    setDrawOrder(0)
    setColorPicker({ key: null, visible: false })
  }

  const handleLockLine = () => {
    setDrawing(false)
    setLocked(true)
  }

  const handleClearAll = () => {
    setMatrix({})
    setDrawing(false)
    setLocked(false)
    setDrawOrder(0)
    setColorPicker({ key: null, visible: false })
  }

  const handleSave = () => {
    const data = Object.entries(matrix)
      .sort((a, b) => a[1].order - b[1].order)
      .map(([key, val]) => ({
        logical_address: key,
        physical_address: val.order,
        color: val.color
      }))

    console.log('Matrix save data:', data)
    alert('Matrix saved to console!')
  }

  const renderGrid = () => {
    const grid = []
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const key = toLogicalKey(row, col)
        const cell = matrix[key]
        const isActive = cell?.active
        const color = cell?.color || '#eee'

        grid.push(
          <button
            key={key}
            onClick={() => handleCellClick(row, col)}
            className="w-8 h-8 text-[0.75rem] font-mono border rounded flex items-center justify-center"
            style={{
              width: '2rem',
              height: '2rem',
              padding: 0,
              backgroundColor: isActive ? color : '#eee',
              borderColor: isActive ? '#333' : '#aaa'
            }}
          >
            {isActive ? cell.order : ''}
          </button>
        )
      }
    }
    return grid
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <Button onClick={handleDrawLine}>Draw Line</Button>
        <Button onClick={handleLockLine}>Lock-in Line</Button>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleClearAll} className="bg-red-500">Clear All</Button>
      </div>

      <div className="flex justify-center items-center">
        <div
          className="grid gap-[2px]"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, 2.5rem)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 2.25rem)`
          }}
        >
          {renderGrid()}
        </div>
      </div>

      {colorPicker.visible && (
        <div className="mt-4 flex flex-col items-center bg-white text-black p-4 rounded shadow">
          <label htmlFor="colorInput">Choose color for {colorPicker.key}</label>
          <input
            type="color"
            id="colorInput"
            value={matrix[colorPicker.key]?.color}
            onChange={handleColorChange}
            className="mt-2"
          />
          <Button className="mt-2" onClick={() => setColorPicker({ key: null, visible: false })}>
            Close
          </Button>
        </div>
      )}
    </div>
  )
}
