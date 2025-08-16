import React, { useState } from 'react';
import './GoalForm.css';
// Available categories for dropdown
const categories = [
  'Travel', 'Emergency', 'Electronics', 
  'Real Estate', 'Vehicle', 'Education',
  'Shopping', 'Retirement', 'Home', 'Other'
];

function GoalForm({ onAddGoal }) {
  // Form state
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [deadline, setDeadline] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newGoal = {
      name,
      targetAmount: parseFloat(targetAmount),
      savedAmount: 0,
      category,
      deadline,
      createdAt: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
    };
    
    onAddGoal(newGoal);
    
    // Reset form
    setName('');
    setTargetAmount('');
    setCategory(categories[0]);
    setDeadline('');
  };

  return (
    <div className="goal-form-container">
      <h2>Add New Goal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Goal Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            placeholder="e.g., Japan Vacation"
          />
        </div>
        
        <div className="form-group">
          <label>Target Amount (sh.):</label>
          <input 
            type="number" 
            min="0.01" 
            step="0.01" 
            value={targetAmount} 
            onChange={(e) => setTargetAmount(e.target.value)} 
            required 
            placeholder="5000.00"
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
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <button type="submit">Create Goal</button>
      </form>
    </div>
  );
}

export default GoalForm;