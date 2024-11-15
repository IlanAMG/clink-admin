import { Container } from "./OngletStyled";

export default function Onglet({
  toggleTabs,
  changeToggle,
  children,
  creation,
}) {
  const toggleTab = (id) => {
    changeToggle(id);
  };

  if (creation) return children;
  return (
    <Container>
      <div className="bloc-onglets">
        <div
          className={toggleTabs === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Edition
        </div>
        <div
          className={toggleTabs === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Options
        </div>
      </div>
      <div className="contenue-onglets">
        <div
          className={toggleTabs === 1 ? "contenu active-contenu" : "contenu"}
        >
          {children}
        </div>
        <div
          className={toggleTabs === 2 ? "contenu active-contenu" : "contenu"}
        >
          {children}
        </div>
      </div>
    </Container>
  );
}
