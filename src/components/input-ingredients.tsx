interface Props {
  ingredient: string;
  inputTabIndex: number;
  inputTabIndexTwo: number;
  visible: boolean;
}

const InputIngredients: React.FC<Props> = ({
  ingredient,
  inputTabIndex,
  inputTabIndexTwo,
  visible,
}) => {
  return (
    <div
      className={`ingredients-group ${visible ? '' : 'hidden'}`}
      id={`${ingredient.toLocaleLowerCase()}-input-grup`}
    >
      <div className="label-ingredient">
        <label
          id={`${ingredient.toLowerCase()}-label`}
          htmlFor={`${ingredient.toLowerCase()}-grams`}
        >
          {ingredient}
        </label>
        <p className="volume-label" id={`${ingredient.toLowerCase()}-volume`}>
          3.17cups
        </p>
      </div>
      <div className="input-group">
        <div className="input-ingredient left">
          <input
            tabIndex={inputTabIndex}
            id={ingredient.toLowerCase()}
            type="number"
            name={ingredient.toLowerCase()}
            onClick={(e) => e.currentTarget.select()}
          ></input>
          <p>%</p>
        </div>
        <div className="input-ingredient right">
          <input
            tabIndex={inputTabIndexTwo}
            id={`${ingredient.toLowerCase()}-grams`}
            type="number"
            name={`${ingredient.toLowerCase()}-grams`}
            onClick={(e) => e.currentTarget.select()}
          ></input>
          <p>g</p>
        </div>
      </div>
    </div>
  );
};
export default InputIngredients;
