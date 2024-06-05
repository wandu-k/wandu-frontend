import avatarBody from "../../images/avatar/body.png";

const AvatarUi = () => {
  return (
    <>
      <div className="w-full h-full">
        <div className="p-4 w-full h-full">
          <div className="relative w-full h-full">
            <img
              src={avatarBody}
              className=" absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AvatarUi;
