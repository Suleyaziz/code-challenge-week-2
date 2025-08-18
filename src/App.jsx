import { useState, useEffect } from 'react'; // Import React hooks
import GoalsList from './components/GoalList'; // Import GoalsList component
import GoalForm from './components/GoalForm'; // Import GoalForm component
import DepositForm from './components/DepositForm'; // Import DepositForm component
import Overview from './components/Overview'; // Import Overview component
import './App.css'; // Import styles

function App() {
  const [goals, setGoals] = useState([]); // State for goals data
  const [activeTab, setActiveTab] = useState('goals'); // State for active tab

  useEffect(() => { // Fetch goals on component mount
    const fetchGoals = async () => { // Async fetch function
      try { // Try fetching
        const response = await fetch('http://localhost:3000/goals'); // API call
        const data = await response.json(); // Parse response
        setGoals(data); // Update state
      } catch (error) { // Catch errors
        console.error('Error fetching goals:', error); // Log error
      }
    };
    fetchGoals(); // Call fetch function
  }, []); // Empty dependency array (runs once)

  const addGoal = async (newGoal) => { // Add new goal
    try {
      const response = await fetch('http://localhost:3000/goals', { // POST request
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGoal) // Send new goal data
      });
      const data = await response.json(); // Parse response
      setGoals([...goals, data]); // Update state
    } catch (error) {
      console.error('Error adding goal:', error); // Log error
    }
  };

  const updateGoal = async (updatedGoal) => { // Update existing goal
    try {
      await fetch(`http://localhost:3000/goals/${updatedGoal.id}`, { // PUT request
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedGoal) // Send updated data
      });
      setGoals(goals.map(g => g.id === updatedGoal.id ? updatedGoal : g)); // Update state
    } catch (error) {
      console.error('Error updating goal:', error); // Log error
    }
  };

  const deleteGoal = async (id) => { // Delete goal
    try {
      await fetch(`http://localhost:3000/goals/${id}`, { method: 'DELETE' }); // DELETE request
      setGoals(goals.filter(goal => goal.id !== id)); // Update state
    } catch (error) {
      console.error('Error deleting goal:', error); // Log error
    }
  };

  const makeDeposit = async (goalId, amount) => { // Make deposit
    try {
      const goalToUpdate = goals.find(g => g.id === goalId); // Find goal
      const updatedGoal = { // Create updated goal
        ...goalToUpdate,
        savedAmount: goalToUpdate.savedAmount + amount // Add deposit
      };
      await updateGoal(updatedGoal); // Call update
    } catch (error) {
      console.error('Error making deposit:', error); // Log error
    }
  };

  return ( // Render UI
    <div className="app-container"> {/* Main container */}
      <h1>Smart Goal Planner</h1> {/* Title */}
      
      {/* Navigation Tabs */}
      <div className="tabs">
        <button // Goals tab button
          className={activeTab === 'goals' ? 'active' : ''}
          onClick={() => setActiveTab('goals')}
        >
          My Goals
        </button>
        <button // Overview tab button
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
      </div>
      
      {/* Main Content */}
      {activeTab === 'goals' ? ( // Conditional render
        <div className="goals-section"> {/* Goals section */}
          <GoalForm onAddGoal={addGoal} /> {/* Goal form */}
          <DepositForm goals={goals} onMakeDeposit={makeDeposit} /> {/* Deposit form */}
          <GoalsList // Goals list
            goals={goals} 
            onUpdateGoal={updateGoal} 
            onDeleteGoal={deleteGoal} 
          />
        </div>
      ) : (
        <Overview goals={goals} /> {/* Overview section */}
      )}
    </div>
  );
}

export default App; // Export component