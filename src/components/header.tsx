const HeaderComponent = (): JSX.Element => {
  return (
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
  );
};

export default HeaderComponent;
