import ProgressBar from './shared/ProgressBar';
import EditForm from './shared/EditForm';
import './GoalCard.css';

// GoalCard component that receives multiple props including goal data and handler functions
function GoalCard({ goal, statusInfo, isEditing, onEdit, onSave, onCancel, onDelete }) {
  return (
    <div className={`goal-card ${statusInfo.status}`}>
      {/* Conditional rendering - show EditForm when in editing mode */}
      {isEditing ? (
        <EditForm 
          goal={goal}       // Pass current goal data to edit form
          onSave={onSave}   // Pass save handler function
          onCancel={onCancel} // Pass cancel handler function
        />
      ) : (
        /* Fragment to group multiple elements when not in edit mode */
        <>
          {/* Header section containing goal name and category */}
          <div className="goal-header">
            <h3>{goal.name}</h3>  {/* Display goal name */}
            {/* Category badge with dynamic class based on category */}
            <span className={`category ${goal.category.toLowerCase()}`}>
              {goal.category}  {/* Display goal category */}
            </span>
          </div>
          
          {/* Progress bar showing completion percentage */}
          <ProgressBar progress={statusInfo.progress} />
          
          {/* Container for financial details and deadline information */}
          <div className="goal-details">
            {/* Financial information section */}
            <div className="amounts">
              {/* Display saved amount with locale formatting */}
              <span>Saved: sh.{goal.savedAmount.toLocaleString()}</span>
              {/* Display target amount with locale formatting */}
              <span>Target: sh.{goal.targetAmount.toLocaleString()}</span>
              {/* Calculate and display remaining amount */}
              <span>Remaining: sh.{(goal.targetAmount - goal.savedAmount).toLocaleString()}</span>
            </div>
            
            {/* Deadline status information section */}
            <div className="deadline-info">
              {/* Conditional rendering based on goal status */}
              {statusInfo.status === 'completed' ? (
                <span className="status-badge completed">Completed!</span>
              ) : statusInfo.status === 'overdue' ? (
                <span className="status-badge overdue">Overdue</span>
              ) : statusInfo.status === 'urgent' ? (
                <span className="status-badge urgent">
                  {/* Display days left with proper pluralization */}
                  {statusInfo.daysLeft} day{statusInfo.daysLeft !== 1 ? 's' : ''} left!
                </span>
              ) : (
                <span>{statusInfo.daysLeft} days remaining</span>
              )}
            </div>
          </div>
          
          {/* Action buttons section */}
          <div className="goal-actions">
            <button onClick={onEdit}>Edit</button>  {/* Edit button */}
            <button onClick={onDelete}>Delete</button>  {/* Delete button */}
          </div>
        </>
      )}
    </div>
  );
}

// Export GoalCard as default export
export default GoalCard;