import { useState } from 'react';
import './DepositForm.css';

// DepositForm component that takes goals array and onMakeDeposit function as props
function DepositForm({ goals, onMakeDeposit }) {
  // State for tracking which goal is selected in the dropdown
  const [selectedGoalId, setSelectedGoalId] = useState('');
  // State for tracking the deposit amount input
  const [amount, setAmount] = useState('');
  // State for tracking the date, initialized to today's date in YYYY-MM-DD format
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    // Validate that a goal is selected and amount is entered
if (!selectedGoalId || !amount) {
    return false; 
  }
    // Convert amount string to a float number
    const depositAmount = parseFloat(amount);
    // Validate that amount is positive
    if (depositAmount <= 0){
    return false; 
  }
    
    // Call the parent component's deposit handler with selected goal ID and amount
    onMakeDeposit(selectedGoalId, depositAmount);
    
    // Reset the amount field after submission
    setAmount('');
  };

  return (
    <div className="deposit-form-container">
      <h2>Make a Deposit</h2>
      {/* Form element with onSubmit handler */}
      <form onSubmit={handleSubmit}>
        {/* First form group - Goal selection dropdown */}
        <div className="form-group">
          <label>Select Goal:</label>
          {/* Dropdown select for choosing a goal */}
          <select 
            value={selectedGoalId} 
            onChange={(e) => setSelectedGoalId(e.target.value)} // Update state on change
            required // Makes this field mandatory
          >
            {/* Default/placeholder option */}
            <option value="">-- Select a Goal --</option>
            {/* Map through goals to create dropdown options */}
            {goals.map(goal => (
              <option key={goal.id} value={goal.id}>
                {/* Display goal name and progress (saved/target) */}
                {goal.name} (sh.{goal.savedAmount} of sh.{goal.targetAmount})
              </option>
            ))}
          </select>
        </div>
        
        {/* Second form group - Amount input */}
        <div className="form-group">
          <label>Amount (sh.):</label>
          {/* Input for deposit amount */}
          <input 
            type="number" // Ensures numeric input
            min="0.01"    // Minimum allowed value
            step="0.01"   // Allows decimal values to two places
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} // Update state on change
            required      // Makes this field mandatory
            placeholder="100.00" // Example format
          />
        </div>
        
        {/* Third form group - Date input */}
        <div className="form-group">
          <label>Date:</label>
          {/* Input for deposit date */}
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} // Update state on change
            required      // Makes this field mandatory
            max={new Date().toISOString().split('T')[0]} // Can't select future dates
          />
        </div>
        
        {/* Submit button for the form */}
        <button type="submit">Add Deposit</button>
      </form>
    </div>
  );
}

// Export the DepositForm component as default
export default DepositForm;