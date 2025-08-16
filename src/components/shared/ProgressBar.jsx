import './ProgressBar.css'; 


function ProgressBar({ progress }) {
  return (
    <div className="progress-container">
      <div 
        className="progress-bar" 
        style={{ width: `sh.{Math.min(100, progress)}%` }}
      >
        <span className="progress-text">{progress.toFixed(1)}%</span>
      </div>
    </div>
  );
}

export default ProgressBar;