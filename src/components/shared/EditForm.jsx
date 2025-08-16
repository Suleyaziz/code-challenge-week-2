import React, { useState } from 'react';

const categories = [
  'Travel', 'Emergency', 'Electronics', 
  'Real Estate', 'Vehicle', 'Education',
  'Shopping', 'Retirement', 'Home', 'Other'
];

function EditForm({ goal, onSave, onCancel }) {
  const [name, setName] = useState(goal.name);
  const [targetAmount, setTargetAmount] = useState(goal.targetAmount);
  const [category, setCategory] = useState(goal.category);
  const [deadline, setDeadline] = useState(goal.deadline);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...goal,
      name,
      targetAmount: parseFloat(targetAmount),
      category,
      deadline
    });
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      
      <div className="form-group">
        <label>Target Amount:</label>
        <input 
          type="number" 
          min="0.01" 
          step="0.01" 
          value={targetAmount} 
          onChange={(e) => setTargetAmount(e.target.value)} 
          required 
        />
      </div>
      
      <div className="form-group">
        <label>Category:</label>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label>Deadline:</label>
        <input 
          type="date" 
          value={deadline} 
          onChange={(e) => setDeadline(e.target.value)} 
          required 
        />
      </div>
      
      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default EditForm;