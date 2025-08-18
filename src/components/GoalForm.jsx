import { useState } from 'react';
import './GoalForm.css';

// Define available categories for dropdown selection
const categories = [
  'Travel', 'Emergency', 'Electronics', 
  'Real Estate', 'Vehicle', 'Education',
  'Shopping', 'Retirement', 'Home', 'Other'
];

// GoalForm component that receives onAddGoal function as prop
function GoalForm({ onAddGoal }) {
  // State for form fields:
  const [name, setName] = useState(''); // Goal name
  const [targetAmount, setTargetAmount] = useState(''); // Target savings amount
  const [category, setCategory] = useState(categories[0]); // Selected category (defaults to first category)
  const [deadline, setDeadline] = useState(''); // Goal deadline date

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    // Create new goal object from form data
    const newGoal = {
      name, // Goal name from state
      targetAmount: parseFloat(targetAmount), // Convert string to number
      savedAmount: 0, // Initialize saved amount to 0
      category, // Selected category
      deadline, // Deadline date
      createdAt: new Date().toISOString().split('T')[0] // Current date in YYYY-MM-DD format
    };
    
    // Call parent component's function to add the new goal
    onAddGoal(newGoal);
    
    // Reset form fields after submission
    setName('');
    setTargetAmount('');
    setCategory(categories[0]); // Reset to first category
    setDeadline('');
  };

  // Render the form component
  return (
    <div className="goal-form-container">
      <h2>Add New Goal</h2>
      {/* Form element with submit handler */}
      <form onSubmit={handleSubmit}>
        {/* Goal name input field */}
        <div className="form-group">
          <label>Goal Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} // Update name state on change
            required // Field is mandatory
            placeholder="e.g., Japan Vacation"
          />
        </div>
        
        {/* Target amount input field */}
        <div className="form-group">
          <label>Target Amount (sh.):</label>
          <input 
            type="number" 
            min="0.01" // Minimum allowed value (1 cent)
            step="0.01" // Allows decimal values to two places
            value={targetAmount} 
            onChange={(e) => setTargetAmount(e.target.value)} // Update amount state
            required // Field is mandatory
            placeholder="5000.00"
          />
        </div>
        
        {/* Category dropdown selection */}
        <div className="form-group">
          <label>Category:</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} // Update category state
          >
            {/* Map through categories to create dropdown options */}
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        {/* Deadline date picker */}
        <div className="form-group">
          <label>Deadline:</label>
          <input 
            type="date" 
            value={deadline} 
            onChange={(e) => setDeadline(e.target.value)} // Update deadline state
            required // Field is mandatory
            min={new Date().toISOString().split('T')[0]} // Can't select dates in the past
          />
        </div>
        
        {/* Submit button */}
        <button type="submit">Create Goal</button>
      </form>
    </div>
  );
}

// Export the component as default
export default GoalForm;