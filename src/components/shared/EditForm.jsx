import{ useState } from 'react';

// Define available categories as a constant array
const categories = [
  'Travel', 'Emergency', 'Electronics', 
  'Real Estate', 'Vehicle', 'Education',
  'Shopping', 'Retirement', 'Home', 'Other'
];

// EditForm component that receives goal data and callback functions as props
function EditForm({ goal, onSave, onCancel }) {
  // State for form fields, initialized with the current goal's values
  const [name, setName] = useState(goal.name);          // Goal name state
  const [targetAmount, setTargetAmount] = useState(goal.targetAmount);  // Target amount state
  const [category, setCategory] = useState(goal.category);  // Category state
  const [deadline, setDeadline] = useState(goal.deadline);  // Deadline state

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent default form submission behavior
    
    // Call the onSave prop with updated goal data
    onSave({
      ...goal,                // Spread existing goal properties
      name,                   // Updated name
      targetAmount: parseFloat(targetAmount),  // Convert string to number
      category,               // Updated category
      deadline                // Updated deadline
    });
  };

  // Render the edit form
  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      {/* Name input field */}
      <div className="form-group">
        <label>Name:</label>
        <input 
          type="text" 
          value={name}                       // Controlled component value
          onChange={(e) => setName(e.target.value)}  // Update state on change
          required                           // Field is required
        />
      </div>
      
      {/* Target amount input field */}
      <div className="form-group">
        <label>Target Amount:</label>
        <input 
          type="number" 
          min="0.01"                         // Minimum allowed value
          step="0.01"                        // Increment step
          value={targetAmount}               // Controlled component value
          onChange={(e) => setTargetAmount(e.target.value)}  // Update state on change
          required                           // Field is required
        />
      </div>
      
      {/* Category dropdown select */}
      <div className="form-group">
        <label>Category:</label>
        <select 
          value={category}                   // Controlled component value
          onChange={(e) => setCategory(e.target.value)}  // Update state on change
        >
          {/* Map through categories to create dropdown options */}
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      
      {/* Deadline date input */}
      <div className="form-group">
        <label>Deadline:</label>
        <input 
          type="date" 
          value={deadline}                   // Controlled component value
          onChange={(e) => setDeadline(e.target.value)}  // Update state on change
          required                           // Field is required
        />
      </div>
      
      {/* Form action buttons */}
      <div className="form-actions">
        <button type="submit">Save</button>          {/* Submit button */}
        <button type="button" onClick={onCancel}>Cancel</button>  {/* Cancel button */}
      </div>
    </form>
  );
}

// Export the EditForm component as default
export default EditForm;