import React from 'react'

export const Options = ({ mode, sorted, setMode, setSorted, availableModes }) => {
  return (
    <div className="options">
      <label htmlFor="transport-mode">Mode of transport: 
        <select id="transport-mode" value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="">Any</option>
          {availableModes.map((mode, index) => <option key={index} value={mode}>{mode}</option>)}
        </select>
      </label>
      <label htmlFor="sort-by">Sort by:
        <select id="sort-by" value={sorted} onChange={(e) => setSorted(e.target.value)}>
          <option value="">Distance</option>
          <option value="time">Time</option>
        </select>
      </label>
    </div>
  )
}