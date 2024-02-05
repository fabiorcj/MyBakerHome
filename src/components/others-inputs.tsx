const OthersInputs = (): JSX.Element => {
  return (
    <div className="">
      <div className="clearfix">
        <label id="water-label" htmlFor="water-grams">
          Water
        </label>
        <p className="volume-label" id="water-volume">
          3.17cups
        </p>
      </div>
      <div className="input-group">
        <div className="input-wrapper left">
          <input
            tabIndex={3}
            id="water"
            type="number"
            name="water"
            onClick={(e) => e.currentTarget.select()}
          ></input>
          <p>%</p>
        </div>
        <div className="input-wrapper right">
          <input
            tabIndex={2}
            id="water-grams"
            type="number"
            name="water-grams"
            onClick={(e) => e.currentTarget.select()}
          ></input>
          <p>g</p>
        </div>
      </div>
    </div>
  );
};

export default OthersInputs;
