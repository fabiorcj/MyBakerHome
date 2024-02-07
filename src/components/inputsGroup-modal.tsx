import { useState } from 'react';
import FlourInput from './flour-input';
import InputIngredients from './input-ingredients';
import CheckBox from './check-box';

const ModalInputs = (): JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false);
  const [saltShowInput, setSaltShowInput] = useState(false);
  const [eggsShowInput, setEggsShowInput] = useState(false);
  const [milkShowInput, setMilkShowInput] = useState(false);
  const [oilShowInput, setOilShowInput] = useState(false);
  const [chocolateShowInput, setChocolateShowInput] = useState(false);
  const [butterShowInput, setButterShowInput] = useState(false);
  const [sugarShowInput, setSugarShowInput] = useState(false);
  const [flour, setFlour] = useState<number>(1000);

  const mostrarModal = () => {
    setModalVisible(true);
  };
  const fecharModal = () => {
    setModalVisible(false);
  };

  const handleFlourChange = (value: number) => {
    setFlour(value);
  };
  return (
    <>
      <>
        <section className="inputs">
          <FlourInput value={flour} onFlourChange={handleFlourChange} />
          <InputIngredients
            ingredient="Water"
            inputTabIndex={2}
            inputTabIndexTwo={3}
            visible={true}
            value={flour}
          />
          <InputIngredients
            ingredient="Salt"
            inputTabIndex={4}
            inputTabIndexTwo={5}
            visible={saltShowInput}
            value={flour}
          />
          <InputIngredients
            ingredient="Sugar"
            inputTabIndex={6}
            inputTabIndexTwo={7}
            visible={sugarShowInput}
            value={flour}
          />
          <InputIngredients
            ingredient="Oil"
            inputTabIndex={8}
            inputTabIndexTwo={9}
            visible={oilShowInput}
            value={flour}
          />
          <InputIngredients
            ingredient="Butter"
            inputTabIndex={10}
            inputTabIndexTwo={11}
            visible={butterShowInput}
            value={flour}
          />
          <InputIngredients
            ingredient="Eggs"
            inputTabIndex={12}
            inputTabIndexTwo={13}
            visible={eggsShowInput}
            value={flour}
          />
          <InputIngredients
            ingredient={'Chocolate'}
            inputTabIndex={14}
            inputTabIndexTwo={15}
            visible={chocolateShowInput}
            value={flour}
          />
          <InputIngredients
            ingredient={'Milk'}
            inputTabIndex={14}
            inputTabIndexTwo={15}
            visible={milkShowInput}
            value={flour}
          />
        </section>
      </>
      <button className="ingredients-button" id="button" onClick={mostrarModal}>
        Add/Remove Ingredients
      </button>
      <div id="modal" className={modalVisible ? '' : 'hidden'}>
        <div className="modal-painel">
          <form method="post">
            <div className="modal-content">
              <div className="input-check">
                <input
                  type="checkbox"
                  name="ingredient"
                  id="flour-checkbox"
                  checked
                  disabled
                />
                <label htmlFor="flour-checkbox">Flour</label>
              </div>
              <div className="input-check">
                <input
                  type="checkbox"
                  name="ingredient"
                  id="water-checkbox"
                  checked
                  disabled
                />
                <label htmlFor="water-checkbox">Water</label>
              </div>
              <div className="input-check">
                <CheckBox
                  ingredient={'Salt'}
                  onToggle={() => setSaltShowInput(!saltShowInput)}
                />
              </div>
              <div className="input-check">
                <CheckBox
                  ingredient={'Milk'}
                  onToggle={() => setMilkShowInput(!milkShowInput)}
                />
              </div>
              <div className="input-check">
                <CheckBox
                  ingredient={'Oil'}
                  onToggle={() => setOilShowInput(!oilShowInput)}
                />
              </div>
              <div className="input-check">
                <CheckBox
                  ingredient={'Eggs'}
                  onToggle={() => setEggsShowInput(!eggsShowInput)}
                />
              </div>
            </div>
            <div className="modal-buttongroup">
              <input
                type="button"
                className="modal-close"
                value="OK"
                onClick={fecharModal}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ModalInputs;
