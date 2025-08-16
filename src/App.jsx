import React, { useState, useEffect } from 'react';
import GoalsList from './components/GoalList';
import GoalForm from './components/GoalForm';
import DepositForm from './components/DepositForm';
import Overview from './components/Overview';
import './App.css';

function App() {
  // State for goals data and active tab
  const [goals, setGoals] = useState([]);
  const [activeTab, setActiveTab] = useState('goals');

  // Fetch goals from json-server on component mount
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch('http://localhost:3000/goals');
        const data = await response.json();
        setGoals(data);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };
    fetchGoals();
  }, []);

  // Add a new goal to the server and update state
  const addGoal = async (newGoal) => {
    try {
      const response = await fetch('http://localhost:3000/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGoal)
      });
      const data = await response.json();
      setGoals([...goals, data]);
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  // Update an existing goal
  const updateGoal = async (updatedGoal) => {
    try {
      await fetch(`http://localhost:3000/goals/${updatedGoal.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedGoal)
      });
      setGoals(goals.map(g => g.id === updatedGoal.id ? updatedGoal : g));
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  // Delete a goal
  const deleteGoal = async (id) => {
    try {
      await fetch(`http://localhost:3000/goals/${id}`, { method: 'DELETE' });
      setGoals(goals.filter(goal => goal.id !== id));
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  // Make a deposit to a specific goal
  const makeDeposit = async (goalId, amount) => {
    try {
      const goalToUpdate = goals.find(g => g.id === goalId);
      const updatedGoal = {
        ...goalToUpdate,
        savedAmount: goalToUpdate.savedAmount + amount
      };
      
      await updateGoal(updatedGoal);
    } catch (error) {
      console.error('Error making deposit:', error);
    }
  };

  return (
    <div className="app-container">
      <h1>Smart Goal Planner</h1>
      
      {/* Navigation Tabs */}
      <div className="tabs">
        <button 
          className={activeTab === 'goals' ? 'active' : ''}
          onClick={() => setActiveTab('goals')}
        >
          My Goals
        </button>
        <button 
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
      </div>
      
      {/* Main Content Area */}
      {activeTab === 'goals' ? (
        <div className="goals-section">
          <GoalForm onAddGoal={addGoal} />
          <DepositForm goals={goals} onMakeDeposit={makeDeposit} />
          <GoalsList 
            goals={goals} 
            onUpdateGoal={updateGoal} 
            onDeleteGoal={deleteGoal} 
          />
        </div>
      ) : (
        <Overview goals={goals} />
      )}
    </div>
  );
}

export default App;