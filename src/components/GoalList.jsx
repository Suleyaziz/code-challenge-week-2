import { useState } from 'react'; // Import React state hook
import GoalCard from './GoalCard'; // Import GoalCard component
import './GoalList.css'; // Import styles for this component

function GoalsList({ goals, onUpdateGoal, onDeleteGoal }) { // Main component with props
  const [editingGoalId, setEditingGoalId] = useState(null); // Track currently edited goal ID

  const calculateGoalStatus = (goal) => { // Calculate goal status info
    const today = new Date(); // Get current date
    const deadline = new Date(goal.deadline); // Convert goal deadline to Date
    const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24)); // Calculate days remaining
    const progress = (goal.savedAmount / goal.targetAmount) * 100; // Calculate progress percentage
    
    let status = 'active'; // Default status
    if (progress >= 100) status = 'completed'; // Check if goal is complete
    else if (daysLeft <= 0) status = 'overdue'; // Check if deadline passed
    else if (daysLeft <= 30) status = 'urgent'; // Check if deadline is near
    
    return { progress, daysLeft, status }; // Return status object
  };

  return (
    <div className="goals-list"> // Main container
      <h2>My Savings Goals</h2> // Section title
      
      {goals.length === 0 ? ( // Conditional render for empty state
        <p className="no-goals">No goals yet. Add your first savings goal!</p> // Empty message
      ) : (
        <div className="goals-grid"> // Goals container
          {goals.map(goal => ( // Map through goals
            <GoalCard // Render GoalCard for each goal
              key={goal.id} // Unique key
              goal={goal} // Pass goal data
              statusInfo={calculateGoalStatus(goal)} // Pass calculated status
              isEditing={editingGoalId === goal.id} // Edit mode flag
              onEdit={() => setEditingGoalId(goal.id)} // Edit handler
              onSave={(updatedGoal) => { // Save handler
                onUpdateGoal(updatedGoal); // Update goal
                setEditingGoalId(null); // Exit edit mode
              }}
              onCancel={() => setEditingGoalId(null)} // Cancel handler
              onDelete={() => onDeleteGoal(goal.id)} // Delete handler
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default GoalsList; // Export component