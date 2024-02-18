import { useState } from 'react';
import { CheckBox } from './components/check-box';
import { InputIngredients } from './components/input-ingredients';
import LogoPao from './assets/img/pao-logo.png';
import Plus from './assets/img/plus.png';
import Minus from './assets/img/minus.png';
import { NoteCard } from './components/note';
import { useTranslation } from 'react-i18next';

export function App() {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const newCurrentLanguage = localStorage.getItem('language');
    if (newCurrentLanguage) {
      return JSON.parse(newCurrentLanguage);
    }
    return;
  });

  function handleChangeLanguage() {
    const newLanguage = currentLanguage === 'en' ? 'pt' : 'en';
    changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
    localStorage.setItem(
      'language',
      JSON.stringify(currentLanguage === 'en' ? 'pt' : 'en'),
    );
  }

  // add new incredient
  const [state, setState] = useState({
    modal: false,
    salt: false,
    eggs: false,
    milk: false,
    oil: false,
    chocolate: false,
    butter: false,
    sugar: false,
    yeast: false,
  });
  const [extraIngredients, setExtraIngredients] = useState<string[]>([]);

  const addIngredient = (ingredient: string | null) => {
    if (ingredient) {
      setState((prevState) => ({
        ...prevState,
        [ingredient.toLowerCase()]: false,
      }));
      setExtraIngredients([...extraIngredients, ingredient]);
    }
  };
  const ingredients = [
    { name: t('Salt'), visible: state.salt },
    { name: t('Sugar'), visible: state.sugar },
    { name: t('Oil'), visible: state.oil },
    { name: t('Butter'), visible: state.butter },
    { name: t('Eggs'), visible: state.eggs },
    { name: t('Chocolate'), visible: state.chocolate },
    { name: t('Milk'), visible: state.milk },
    { name: t('Yeast'), visible: state.yeast },
    ...extraIngredients.map((ingredient: string) => ({
      name: ingredient,
      visible: state[ingredient.toLowerCase() as keyof typeof state],
    })),
  ];

  // add new incredient

  //functin visible modal
  const mostrarModal = () => {
    setState({ ...state, modal: true });
  };
  const fecharModal = () => {
    setState({ ...state, modal: false });
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
      {currentLanguage === 'en' ? (
        <button
          onClick={handleChangeLanguage}
          className="text-sm font-sans font-semibold bg-gradient-to-r from-blue-600 to-red-500 p-0.5 hover:ring-1 hover:ring-offset-slate-200 border border-color[rgba(223, 220, 200, 0.5)] rounded-lg"
        >
          EN/PT
        </button>
      ) : (
        <button
          onClick={handleChangeLanguage}
          className="text-sm font-sans font-semibold bg-gradient-to-r from-green-600 to-yellow-400 p-0.5 hover:ring-1 hover:ring-offset-slate-200 border border-color[rgba(223, 220, 200, 0.5)] rounded-lg"
        >
          EN/PT
        </button>
      )}
      <header className="header">
        <div className="bread-logo my-3">
          <img className="bread-logo-img" src={LogoPao} alt="" />
        </div>
        <h1> {t('Bread Calculator')}</h1>
      </header>
      <section className="inputs">
        <div className="label-ingredient">
          <label id="flour-label" htmlFor="flour">
            {t('Flour')}
          </label>
        </div>
        <div className="input-ingredient full">
          <div
            id="decrementer"
            className="increment-button"
            onClick={() => scale('down')}
          >
            <img src={Minus} alt="Decrement" />
          </div>
          <div
            id="incrementer"
            className="increment-button"
            onClick={() => scale('up')}
          >
            <img src={Plus} alt="Increment" />
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
          ingredient={t('Water')}
          visible={true}
          value={flourAmount}
        />
        <>
          {ingredients.map((ingredient, index) => (
            <InputIngredients
              key={index}
              ingredient={ingredient.name}
              visible={ingredient.visible}
              value={flourAmount}
            />
          ))}
        </>
      </section>
      <button
        className=" hover:ring-1 hover:ring-offset-slate-200 ingredients-button"
        id="button"
        onClick={mostrarModal}
      >
        {t('Add/Remove Ingredients')}
      </button>
      <div id="modal" className={state.modal ? '' : 'hidden'}>
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
                <label htmlFor="flour-checkbox">{t('Flour')}</label>
              </div>
              <div className="input-check">
                <input
                  type="checkbox"
                  name="ingredient"
                  id="water-checkbox"
                  checked
                  disabled
                />
                <label htmlFor="water-checkbox">{t('Water')}</label>
              </div>
              <>
                {ingredients.map((ingredient, index) => (
                  <CheckBox
                    key={index}
                    ingredient={ingredient.name}
                    onToggle={() =>
                      setState((prevState) => ({
                        ...prevState,
                        [ingredient.name.toLowerCase() as keyof typeof prevState]:
                          !prevState[
                            ingredient.name.toLowerCase() as keyof typeof prevState
                          ],
                      }))
                    }
                  />
                ))}
              </>
            </div>
            <button
              className="ingredients-button"
              id="button"
              onClick={(e) => {
                e.preventDefault();
                addIngredient(prompt(t('Enter ingredient name')));
              }}
            >
              {t('Add Other Ingredient')}
            </button>
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
      <section>
        <NoteCard />
      </section>
    </>
  );
}
