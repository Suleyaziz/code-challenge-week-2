import React, { useState } from 'react';
import './DepositForm.css';

function DepositForm({ goals, onMakeDeposit }) {
  // Form state
  const [selectedGoalId, setSelectedGoalId] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedGoalId || !amount) return;
    
    const depositAmount = parseFloat(amount);
    if (depositAmount <= 0) return;
    
    onMakeDeposit(selectedGoalId, depositAmount);
    
    // Reset form
    setAmount('');
  };

  return (
    <div className="deposit-form-container">
      <h2>Make a Deposit</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Goal:</label>
          <select 
            value={selectedGoalId} 
            onChange={(e) => setSelectedGoalId(e.target.value)}
            required
          >
            <option value="">-- Select a Goal --</option>
            {goals.map(goal => (
              <option key={goal.id} value={goal.id}>
                {goal.name} (sh.{goal.savedAmount} of sh.{goal.targetAmount})
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Amount (sh.):</label>
          <input 
            type="number" 
            min="0.01" 
            step="0.01" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            required 
            placeholder="100.00"
          />
        </div>
        
        <div className="form-group">
          <label>Date:</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <button type="submit">Add Deposit</button>
      </form>
    </div>
  );
}

export default DepositForm;