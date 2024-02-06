interface ModalProps {
  ingredient: string;
  onToggle: () => void;
}

const CheckBox: React.FC<ModalProps> = ({ ingredient, onToggle }) => {
  const handleChange = () => {
    onToggle();
  };
  return (
    <>
      <input
        type="checkbox"
        name="ingredient"
        id={`${ingredient.toLowerCase()}-checkbox`}
        onChange={handleChange}
      />
      <label htmlFor={`${ingredient.toLowerCase}-checkbox`}>{ingredient}</label>
    </>
  );
};
export default CheckBox;
