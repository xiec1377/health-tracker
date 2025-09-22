
interface MoodProps {
  mood: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function MoodSlider({ mood, onChange }: MoodProps) {
  return (
    <div className="row">
      <label htmlFor="mood">Mood</label>
      <div className="mood-slider-container">
        <input
          type="range"
          id="mood"
          name="mood"
          min="1"
          max="5"
          value={mood}
          step="1"
          onChange={(e) => onChange(e)}
        />
        <div className="mood-labels">
          <span>😞</span>
          <span>😐</span>
          <span>😊</span>
          <span>😄</span>
          <span>🤩</span>
        </div>
      </div>
    </div>
  );
}

export default MoodSlider;
