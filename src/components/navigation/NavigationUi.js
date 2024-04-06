import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const NavigationUi = () => {
  return (
    <div className="py-10 flex flex-col justify-between items-center h-auto w-20 border border-slate-100 drop-shadow-xl backdrop-blur-md bg-white/75 rounded-2xl gap-6">
      <div>
        <FontAwesomeIcon icon="fa-solid fa-house" size="2x" />
      </div>
      <div className="border border-slate-400 w-4"></div>
      <div>
        <FontAwesomeIcon icon="fa-solid fa-cart-shopping" size="2x" />
      </div>
      <div className="border border-slate-400 w-4"></div>
      <div>
        <FontAwesomeIcon icon="fa-solid fa-user-group" size="2x" />
      </div>
      <div className="border border-slate-400 w-4"></div>
      <div>
        <FontAwesomeIcon icon="fa-solid fa-ranking-star" size="2x" />
      </div>
      <div className="border border-slate-400 w-4"></div>
      <div>
        <FontAwesomeIcon icon="fa-solid fa-user" size="2x" />
      </div>
    </div>
  );
};

export default NavigationUi;
