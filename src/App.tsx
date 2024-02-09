import { useState } from 'react';
import { CheckBox } from './components/check-box';
import { InputIngredients } from './components/input-ingredients';

export function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [saltShowInput, setSaltShowInput] = useState(false);
  const [eggsShowInput, setEggsShowInput] = useState(false);
  const [milkShowInput, setMilkShowInput] = useState(false);
  const [oilShowInput, setOilShowInput] = useState(false);
  const [chocolateShowInput, setChocolateShowInput] = useState(false);
  const [butterShowInput, setButterShowInput] = useState(false);
  const [sugarShowInput, setSugarShowInput] = useState(false);
  const [yeastShowInput, setYeastShowInput] = useState(false);
  //functin visible modal
  const mostrarModal = () => {
    setModalVisible(true);
  };
  const fecharModal = () => {
    setModalVisible(false);
  };
  //functin visible modal

  //flour value
  const [flourAmount, setFlourAmount] = useState(1000);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setFlourAmount(value);
  };
  //flour value

  //button increment value in flour
  const scale = (direction: 'up' | 'down') => {
    const step = 250;

    if (direction === 'up') {
      setFlourAmount((prevAmount: number) => prevAmount + step);
    } else {
      setFlourAmount((prevAmount: number) => Math.max(prevAmount - step, 0));
    }
  };
  //button increment value in flour
  return (
    <>
      <header className="header">
        <div className="bread-logo">
          <img
            className="bread-logo-img"
            src="./src/assets/img/pao-logo.png"
            alt=""
          />
        </div>
        <h1>Bread Calculator</h1>
      </header>
      <section className="inputs">
        <div className="label-ingredient">
          <label id="flour-label" htmlFor="flour">
            Flour
          </label>
          <p className="volume-label" id="flour-volume">
            ####
          </p>
        </div>
        <div className="input-ingredient full">
          <div
            id="decrementer"
            className="increment-button"
            onClick={() => scale('down')}
          >
            <img src="./src/assets/img/minus.png" alt="Decrement" />
          </div>
          <div
            id="incrementer"
            className="increment-button"
            onClick={() => scale('up')}
          >
            <img src="./src/assets/img/plus.png" alt="Increment" />
          </div>
          <input
            className=""
            id="flour"
            type="number"
            name="flour"
            onClick={(e) => e.currentTarget.select()}
            value={flourAmount}
            onChange={handleInputChange}
          />
          <p>g</p>
        </div>
        <InputIngredients
          ingredient="Water"
          visible={true}
          value={flourAmount}
        />
        <InputIngredients
          ingredient="Salt"
          visible={saltShowInput}
          value={flourAmount}
        />
        <InputIngredients
          ingredient="Sugar"
          visible={sugarShowInput}
          value={flourAmount}
        />
        <InputIngredients
          ingredient="Oil"
          visible={oilShowInput}
          value={flourAmount}
        />
        <InputIngredients
          ingredient="Butter"
          visible={butterShowInput}
          value={flourAmount}
        />
        <InputIngredients
          ingredient="Eggs"
          visible={eggsShowInput}
          value={flourAmount}
        />
        <InputIngredients
          ingredient={'Chocolate'}
          visible={chocolateShowInput}
          value={flourAmount}
        />
        <InputIngredients
          ingredient={'Milk'}
          visible={milkShowInput}
          value={flourAmount}
        />
        <InputIngredients
          ingredient={'Yeast'}
          visible={yeastShowInput}
          value={flourAmount}
        />
      </section>
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

              <CheckBox
                ingredient={'Salt'}
                onToggle={() => setSaltShowInput(!saltShowInput)}
              />

              <CheckBox
                ingredient={'Milk'}
                onToggle={() => setMilkShowInput(!milkShowInput)}
              />

              <CheckBox
                ingredient={'Oil'}
                onToggle={() => setOilShowInput(!oilShowInput)}
              />

              <CheckBox
                ingredient={'Eggs'}
                onToggle={() => setEggsShowInput(!eggsShowInput)}
              />
              <CheckBox
                ingredient={'Butter'}
                onToggle={() => setButterShowInput(!butterShowInput)}
              />
              <CheckBox
                ingredient={'Chocolate'}
                onToggle={() => setChocolateShowInput(!chocolateShowInput)}
              />
              <CheckBox
                ingredient={'Sugar'}
                onToggle={() => setSugarShowInput(!sugarShowInput)}
              />
              <CheckBox
                ingredient={'Yeast'}
                onToggle={() => setYeastShowInput(!yeastShowInput)}
              />
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
}
