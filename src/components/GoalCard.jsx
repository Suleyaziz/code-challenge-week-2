import React from 'react';
import ProgressBar from './shared/ProgressBar';
import EditForm from './shared/EditForm';
import './GoalCard.css';
function GoalCard({ goal, statusInfo, isEditing, onEdit, onSave, onCancel, onDelete }) {
  return (
    <div className={`goal-card ${statusInfo.status}`}>
      {isEditing ? (
        <EditForm 
          goal={goal} 
          onSave={onSave} 
          onCancel={onCancel} 
        />
      ) : (
        <>
          <div className="goal-header">
            <h3>{goal.name}</h3>
            <span className={`category ${goal.category.toLowerCase()}`}>
              {goal.category}
            </span>
          </div>
          
          <ProgressBar progress={statusInfo.progress} />
          
          <div className="goal-details">
            <div className="amounts">
              <span>Saved: ${goal.savedAmount.toLocaleString()}</span>
              <span>Target: ${goal.targetAmount.toLocaleString()}</span>
              <span>Remaining: ${(goal.targetAmount - goal.savedAmount).toLocaleString()}</span>
            </div>
            
            <div className="deadline-info">
              {statusInfo.status === 'completed' ? (
                <span className="status-badge completed">Completed!</span>
              ) : statusInfo.status === 'overdue' ? (
                <span className="status-badge overdue">Overdue</span>
              ) : statusInfo.status === 'urgent' ? (
                <span className="status-badge urgent">
                  {statusInfo.daysLeft} day{statusInfo.daysLeft !== 1 ? 's' : ''} left!
                </span>
              ) : (
                <span>{statusInfo.daysLeft} days remaining</span>
              )}
            </div>
          </div>
          
          <div className="goal-actions">
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default GoalCard;