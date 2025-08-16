import React from 'react';
import ProgressBar from './shared/ProgressBar';
import './Overview.css'; 

function Overview({ goals }) {
  // Calculate statistics
  const totalGoals = goals.length;
  const completedGoals = goals.filter(g => 
    (g.savedAmount / g.targetAmount) >= 1
  ).length;
  
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const overallProgress = (totalSaved / totalTarget) * 100 || 0;
  
  // Calculate days left for each goal
  const calculateDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  };
  
  // Get urgent goals (deadline within 30 days, not complete)
  const urgentGoals = goals.filter(g => {
    const daysLeft = calculateDaysLeft(g.deadline);
    return daysLeft <= 30 && (g.savedAmount / g.targetAmount) < 1;
  });

  return (
    <div className="overview-container">
      <h2>Savings Overview</h2>
      
      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Goals</h3>
          <p>{totalGoals}</p>
        </div>
        
        <div className="summary-card">
          <h3>Completed</h3>
          <p>{completedGoals}</p>
        </div>
        
        <div className="summary-card">
          <h3>Total Saved</h3>
          <p>${totalSaved.toLocaleString()}</p>
        </div>
        
        <div className="summary-card">
          <h3>Overall Progress</h3>
          <ProgressBar progress={overallProgress} />
          <p>{overallProgress.toFixed(1)}%</p>
        </div>
      </div>
      
      {urgentGoals.length > 0 && (
        <div className="urgent-section">
          <h3>⚠️ Urgent Goals</h3>
          <div className="urgent-goals-list">
            {urgentGoals.map(g => {
              const daysLeft = calculateDaysLeft(g.deadline);
              return (
                <div key={g.id} className="urgent-goal">
                  <span className="goal-name">{g.name}</span>
                  <span className="days-left">{daysLeft} day{daysLeft !== 1 ? 's' : ''} left</span>
                  <span className="remaining">
                    sh.{(g.targetAmount - g.savedAmount).toLocaleString()} remaining
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      <div className="all-goals-progress">
        <h3>All Goals Progress</h3>
        <table>
          <thead>
            <tr>
              <th>Goal</th>
              <th>Progress</th>
              <th>Saved</th>
              <th>Deadline</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {goals.map(g => {
              const progress = (g.savedAmount / g.targetAmount) * 100;
              const daysLeft = calculateDaysLeft(g.deadline);
              let status = 'On Track';
              if (progress >= 100) status = 'Completed';
              else if (daysLeft <= 0) status = 'Overdue';
              else if (daysLeft <= 30) status = 'Urgent';
              
              return (
                <tr key={g.id}>
                  <td>{g.name}</td>
                  <td>
                    <ProgressBar progress={progress} />
                  </td>
                  <td>${g.savedAmount.toLocaleString()}</td>
                  <td>{new Date(g.deadline).toLocaleDateString()}</td>
                  <td className={`status ${status.toLowerCase().replace(' ', '-')}`}>
                    {status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Overview;