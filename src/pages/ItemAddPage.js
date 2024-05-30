import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ItemAddPage = () => {
  return (
    <>
      <div className="flex flex-col">
        <button className="w-96 h-96 bg-gray-300 relative">
          <div className="absolute text-3xl">
            <FontAwesomeIcon icon="fa-solid fa-plus" />
          </div>
        </button>
        <input placeholder="제목"></input>
        <input className=" h-44" placeholder="내용"></input>
      </div>
    </>
  );
};

export default ItemAddPage;
