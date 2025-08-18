import './ProgressBar.css'; 

function ProgressBar({ progress }) {
  return (
    // Container div for the progress bar
    <div className="progress-container" >
      {/* 
        The actual progress bar that fills based on the progress value 
        The width is set dynamically using inline styles, with Math.min ensuring it never exceeds 100%
      */}
      <div 
        className="progress-bar" 
        style={{ width: `${Math.min(100, progress)}%` }}
      >
        {/* Display the progress percentage with one decimal place */}
        <span className="progress-text">{progress.toFixed(1)}%</span>
      </div>
    </div>
  );
}

// Export the ProgressBar component as the default export
export default ProgressBar;