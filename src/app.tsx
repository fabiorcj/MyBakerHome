import { useEffect, useRef, useState } from 'react';
import { CheckBox } from './components/check-box';
import { InputIngredients } from './components/input-ingredients';
import LogoPao from './assets/img/pao-logo.png';
import Plus from './assets/img/plus.png';
import Minus from './assets/img/minus.png';
import { NoteCard } from './components/note';
import { useTranslation } from 'react-i18next';
import ReactToPrint from 'react-to-print';

export function App() {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(language);

  useEffect(() => {
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
    changeLanguage(preferredLanguage);
    setCurrentLanguage(preferredLanguage);
  }, []);

  function handleChangeLanguage() {
    const newLanguage = currentLanguage === 'en' ? 'pt' : 'en';
    changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
    window.location.reload();
  }

  // add new incredient
  const [state, setState] = useState({
    modal: false,
    [t('water')]: false,
    [t('salt')]: false,
    [t('eggs')]: false,
    [t('milk')]: false,
    [t('oil')]: false,
    [t('chocolate')]: false,
    [t('butter')]: false,
    [t('sugar')]: false,
    [t('yeast')]: false,
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
    { name: t('Water'), visible: state[t('water')] },
    { name: t('Salt'), visible: state[t('salt')] },
    { name: t('Sugar'), visible: state[t('sugar')] },
    { name: t('Oil'), visible: state[t('oil')] },
    { name: t('Butter'), visible: state[t('butter')] },
    { name: t('Eggs'), visible: state[t('eggs')] },
    { name: t('Chocolate'), visible: state[t('chocolate')] },
    { name: t('Milk'), visible: state[t('milk')] },
    { name: t('Yeast'), visible: state[t('yeast')] },
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

  const componentRef = useRef(null);

  return (
    <section ref={componentRef}>
      {currentLanguage === 'en' ? (
        <button
          onClick={handleChangeLanguage}
          className="hiddenPrint text-sm font-sans font-semibold bg-gradient-to-r from-blue-600 to-red-500 p-0.5 hover:ring-1 hover:ring-offset-slate-200 border border-color[rgba(223, 220, 200, 0.5)] rounded-lg"
        >
          EN/PT
        </button>
      ) : (
        <button
          onClick={handleChangeLanguage}
          className="hiddenPrint text-sm font-sans font-semibold bg-gradient-to-r from-green-600 to-yellow-400 p-0.5 hover:ring-1 hover:ring-offset-slate-200 border border-color[rgba(223, 220, 200, 0.5)] rounded-lg"
        >
          EN/PT
        </button>
      )}
      <header className="header">
        <div className="bread-logo my-3">
          <img className="bread-logo-img" src={LogoPao} alt="" />
        </div>
        <h1 className="marginOff"> {t('Bread Calculator')}</h1>
        <input
          className="text-center "
          name="Receita"
          type="text"
          id="name"
          placeholder="Nome da receita"
          required
        />
      </header>
      <section className="inputs">
        <div className="label-ingredient">
          <label className="marginOff" id="flour-label" htmlFor="flour">
            {t('Flour')}
          </label>
        </div>
        <div className="input-ingredient full">
          <div
            id="decrementer"
            className="increment-button"
            onClick={() => scale('down')}
          >
            <img className="hiddenPrint" src={Minus} alt="Decrement" />
          </div>
          <div
            id="incrementer"
            className="increment-button"
            onClick={() => scale('up')}
          >
            <img className=" hiddenPrint" src={Plus} alt="Increment" />
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
        className=" hiddenPrint hover:ring-1 hover:ring-offset-slate-200 ingredients-button"
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
      <ReactToPrint
        trigger={() => (
          <button className="hiddenPrint hiddenPrint bg-lime-600 hover:ring-1 hover:ring-offset-slate-200 border border-color[rgba(223, 220, 200, 0.5)] rounded-lg w-auto mt-1 p-1 font-semibold text-sm">
            Save Recipe
          </button>
        )}
        content={() => componentRef.current}
        pageStyle={` @media print {
        .hiddenPrint {
          display: none;
         }
        .marginOff {
          margin: 0;
         }


      }`}
      />
    </section>
  );
}
