import React from 'react'; // Import React library
import ProgressBar from './shared/ProgressBar'; // Import ProgressBar component
import './Overview.css'; // Import stylesheet

function Overview({ goals }) { // Main component accepting goals prop

  // Calculate total number of goals
  const totalGoals = goals.length;

  // Count completed goals (saved >= target)
  const completedGoals = goals.filter(g => 
    (g.savedAmount / g.targetAmount) >= 1
  ).length;
  
  // Calculate sum of all saved amounts
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  // Calculate sum of all target amounts
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  // Calculate overall progress percentage
  const overallProgress = (totalSaved / totalTarget) * 100 || 0;
  
  // Helper function to calculate days until deadline
  const calculateDaysLeft = (deadline) => {
    const today = new Date(); // Current date
    const deadlineDate = new Date(deadline); // Convert deadline to Date
    return Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24)); // Days difference
  };
  
  // Filter urgent goals (due in <=30 days and incomplete)
  const urgentGoals = goals.filter(g => {
    const daysLeft = calculateDaysLeft(g.deadline);
    return daysLeft <= 30 && (g.savedAmount / g.targetAmount) < 1;
  });

  return (
    <div className="overview-container"> {/* Main container */}
      <h2>Savings Overview</h2> {/* Section title */}
      
      {/* Summary statistics cards */}
      <div className="summary-cards">
        <div className="summary-card"> {/* Total goals card */}
          <h3>Total Goals</h3>
          <p>{totalGoals}</p>
        </div>
        
        <div className="summary-card"> {/* Completed goals card */}
          <h3>Completed</h3>
          <p>{completedGoals}</p>
        </div>
        
        <div className="summary-card"> {/* Total saved amount card */}
          <h3>Total Saved</h3>
          <p>sh.{totalSaved.toLocaleString()}</p>
        </div>
        
        <div className="summary-card"> {/* Overall progress card */}
          <h3>Overall Progress</h3>
          <ProgressBar progress={overallProgress} /> {/* Progress bar */}
          <p>{overallProgress.toFixed(1)}%</p> {/* Percentage */}
        </div>
      </div>
      
      {/* Urgent goals section (only shows if urgent goals exist) */}
      {urgentGoals.length > 0 && (
        <div className="urgent-section">
          <h3>Urgent Goals</h3>
          <div className="urgent-goals-list">
            {urgentGoals.map(g => {
              const daysLeft = calculateDaysLeft(g.deadline);
              return (
                <div key={g.id} className="urgent-goal">
                  <span className="goal-name">{g.name}</span> {/* Goal name */}
                  <span className="days-left">{daysLeft} day{daysLeft !== 1 ? 's' : ''} left</span> {/* Days left */}
                  <span className="remaining">
                    sh.{(g.targetAmount - g.savedAmount).toLocaleString()} remaining
                  </span> {/* Amount remaining */}
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* All goals progress table */}
      <div className="all-goals-progress">
        <h3>All Goals Progress</h3>
        <table>
          <thead> {/* Table header */}
            <tr>
              <th>Goal</th>
              <th>Progress</th>
              <th>Saved</th>
              <th>Deadline</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody> {/* Table body */}
            {goals.map(g => {
              const progress = (g.savedAmount / g.targetAmount) * 100; // Goal progress
              const daysLeft = calculateDaysLeft(g.deadline); // Days remaining
              let status = 'On Track'; // Default status
              if (progress >= 100) status = 'Completed';
              else if (daysLeft <= 0) status = 'Overdue';
              else if (daysLeft <= 30) status = 'Urgent';
              
              return (
                <tr key={g.id}> {/* Table row per goal */}
                  <td>{g.name}</td> {/* Goal name */}
                  <td>
                    <ProgressBar progress={progress} /> {/* Progress bar */}
                  </td>
                  <td>sh.{g.savedAmount.toLocaleString()}</td> {/* Saved amount */}
                  <td>{new Date(g.deadline).toLocaleDateString()}</td> {/* Formatted deadline */}
                  <td className={`status ${status.toLowerCase().replace(' ', '-')}`}>
                    {status} {/* Status with dynamic class */}
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

export default Overview; // Export component