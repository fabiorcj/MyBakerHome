import React from 'react';
import { useState } from 'react';

interface Props {
  ingredient: string;
  inputTabIndex: number;
  inputTabIndexTwo: number;
  visible: boolean;
  value: number;
}

const InputIngredients: React.FC<Props> = ({
  ingredient,
  inputTabIndex,
  inputTabIndexTwo,
  visible,
  value,
}) => {
  const [inputIngredientValue, setInputIngredientValue] = useState<number>(0);
  const [percentageInput, setPercentageInput] = useState<number>(0);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setInputIngredientValue(newValue);
    setPercentageInput((newValue / value) * 100);
  };
  const handlePercentageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newPercentage = parseFloat(event.target.value);
    setPercentageInput(newPercentage);
    setInputIngredientValue((value * newPercentage) / 100);
  };
  return (
    <div
      className={`ingredients-group ${visible ? '' : 'hidden'}`}
      id={`${ingredient.toLowerCase()}-input-group`}
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
            value={percentageInput}
            onChange={handlePercentageChange}
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
            value={inputIngredientValue}
            onChange={handleChange}
          ></input>
          <p>g</p>
        </div>
      </div>
    </div>
  );
};
export default InputIngredients;
