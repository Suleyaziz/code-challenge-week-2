import { useState } from 'react';
import GoalCard from './GoalCard';
import './GoalList.css'; // Assuming you have some styles for the goal list

function GoalsList({ goals, onUpdateGoal, onDeleteGoal }) {
  const [editingGoalId, setEditingGoalId] = useState(null);

  // Helper function to calculate goal status
  const calculateGoalStatus = (goal) => {
    const today = new Date();
    const deadline = new Date(goal.deadline);
    const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    const progress = (goal.savedAmount / goal.targetAmount) * 100;
    
    let status = 'active';
    if (progress >= 100) status = 'completed';
    else if (daysLeft <= 0) status = 'overdue';
    else if (daysLeft <= 30) status = 'urgent';
    
    return { progress, daysLeft, status };
  };

  return (
    <div className="goals-list">
      <h2>My Savings Goals</h2>
      
      {goals.length === 0 ? (
        <p className="no-goals">No goals yet. Add your first savings goal!</p>
      ) : (
        <div className="goals-grid">
          {goals.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              statusInfo={calculateGoalStatus(goal)}
              isEditing={editingGoalId === goal.id}
              onEdit={() => setEditingGoalId(goal.id)}
              onSave={(updatedGoal) => {
                onUpdateGoal(updatedGoal);
                setEditingGoalId(null);
              }}
              onCancel={() => setEditingGoalId(null)}
              onDelete={() => onDeleteGoal(goal.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default GoalsList;