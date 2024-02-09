import React, { useEffect } from 'react';
import { useState } from 'react';
import { Props } from './input-ingredients';

export const InputIngredients: React.FC<Props> = ({
  ingredient,
  visible,
  value,
}) => {
  const [inputIngredientValue, setInputIngredientValue] = useState<number>(0);
  const [percentageInput, setPercentageInput] = useState<number>(0);
  const [cupValue, setCupValue] = useState<number>(0);
  // math ingredient value
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setInputIngredientValue(newValue);
    setPercentageInput((newValue / value) * 100);
  };
  // math ingredient value
  // math percentage value
  const handlePercentageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newPercentage = parseFloat(event.target.value);
    setPercentageInput(newPercentage);
    setInputIngredientValue((value * newPercentage) / 100);
  };
  // math percentage value
  // flour att ingredient value
  useEffect(() => {
    setInputIngredientValue((value * percentageInput) / 100);
  }, [value]);
  // flour att ingredient value
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
      </div>
      <div className="input-group">
        <div className="input-ingredient left">
          <input
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
