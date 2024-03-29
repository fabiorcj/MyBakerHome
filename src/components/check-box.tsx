interface Props {
  ingredient: string;
  onToggle: () => void;
}

export const CheckBox: React.FC<Props> = ({ ingredient, onToggle }) => {
  const handleChange = () => {
    onToggle();
  };
  return (
    <div className="input-check">
      <input
        type="checkbox"
        name="ingredient"
        id={`${ingredient.toLowerCase()}-checkbox`}
        onChange={handleChange}
      />
      <label htmlFor={`${ingredient.toLowerCase}-checkbox`}>{ingredient}</label>
    </div>
  );
};
