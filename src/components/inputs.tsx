const InputComponent = (): JSX.Element => {
  return (
    <div className="inputs">
      <div className="clearfix">
        <label id="flour-label" htmlFor="flour">
          Flour
        </label>
        <p className="volume-label" id="flour-volume">
          g
        </p>
      </div>
    </div>
  );
};

export default InputComponent;
