import axios from "axios";
import { useEffect, useRef, useState, useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Notify } from "notiflix";


const ItemAddPage = () => {
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const { userInfo } = useContext(LoginContext);
  const [filePath, setfilePath] = useState("");
  const [categoryButton, setCategoryButton] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [metadata, setMetadata] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const handlefileAddButton = () => {
    fileInputRef.current.click();
  };

  const handleCategoryButton = () => {
    setCategoryButton(!categoryButton);
  };

  const handleCategorySelectButton = (subcategory) => {
    console.log(subcategory);
    setSelectedCategory(subcategory);
    setCategoryButton(false);
  };

  useEffect(() => {
    setValue("subcategoryId", selectedCategory?.subcategoryId);
  }, [selectedCategory]);

  const onSubmit = (data) => {
    const formData = new FormData();

    const jsonData = JSON.stringify(data);

    console.log(jsonData);

    const blob = new Blob([jsonData], { type: "application/json" });

    formData.append("itemfile", fileInputRef.current.files[0]);

    formData.append("shopDto", blob);

    axios
      .post("/api/user/shop", formData, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        Notify.success(response.data);

      })
      .catch((error) => {});
      navigate(`/shop`);
  };

  useEffect(() => {
    setValue("userId", userInfo?.userId);
  }, [userInfo]);

  useEffect(() => {
    axios
      .get("/api/public/shop/subcategory")
      .then((response) => {
        setSubcategories(response.data);
        if (response.data.length > 0) {
          const firstSubcategory = response.data[0];
          setSelectedCategory(firstSubcategory);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch subcategories:", error);
      });
  }, []);

  const renderCategories = () => {
    const categories = {};
    subcategories.forEach((subcategory) => {
      if (!categories[subcategory.categoryName]) {
        categories[subcategory.categoryName] = [];
      }
      categories[subcategory.categoryName].push(subcategory);
    });

    return Object.keys(categories).map((categoryName) => (
      <div key={categoryName} className="p-2">
        <div className="font-bold tracking-tight">{categoryName}</div>
        <div className="flex flex-col">
          {categories[categoryName].map((subcategory) => (
            <button
              type="button"
              key={subcategory.subcategoryId}
              className="pl-4 w-full text-left"
              onClick={() => handleCategorySelectButton(subcategory)}
            >
              <div className="font-bold">{subcategory.subcategoryName}</div>
            </button>
          ))}
        </div>
      </div>
    ));
  };

  const previewImage = () => {
    if (fileInputRef.current && fileInputRef.current.files) {
      const file = fileInputRef.current.files[0];

      setfilePath(file.name);
    }
  };
  return (
    <>
      <div className="flex justify-center w-full pb-16 pt-20 relative max-lg:flex-col">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full p-4 gap-2"
        >
          <input
            hidden
            type="file"
            accept={
              selectedCategory?.categoryId == 1 ? ".gif, .jpg, .png" : ".mp3"
            }
            onChange={previewImage}
            ref={fileInputRef}
          ></input>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 w-full">
              <label className="font-bold text-xl">아이템 정보</label>
              <input
                placeholder="제목"
                className="w-full p-2 border rounded-2xl"
                {...register("itemName", { required: "Item name is required" })}
              ></input>
              <label className="font-bold text-xl">아이템 가격</label>
              <input
                placeholder="가격"
                className="w-full p-2 border rounded-2xl"
                {...register("price", { required: "Item price is required" })}
              ></input>
              <div className="flex flex-col gap-2 relative">
                <label className="font-bold text-xl">아이템 카테고리</label>
                <button
                  type="button"
                  className="w-full p-2 border rounded-2xl h-12 text-left font-bold tracking-tight"
                  onClick={handleCategoryButton}
                >
                  {selectedCategory?.subcategoryName}
                </button>
                {categoryButton && (
                  <div className="absolute top-24 border rounded-2xl w-full flex flex-col bg-white z-10 p-2">
                    {renderCategories()}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-xl">아이템 업로드</label>
                <button
                  type="button"
                  className="w-full h-36 border rounded-2xl relative overflow-hidden"
                  onClick={handlefileAddButton}
                >
                  {filePath ? (
                    <div className="absolute top-0 text-xl w-full h-full font-bold content-center">
                      {filePath}
                    </div>
                  ) : (
                    <div className="absolute top-0 text-xl w-full h-full flex flex-col font-bold content-center justify-center">
                      <div className="text-lg">
                        하나의 파일만 업로드 가능합니다.
                      </div>
                      <div className=" text-sm">
                        {" "}
                        {selectedCategory?.categoryId == 1
                          ? ".gif, .jpg, .png"
                          : ".mp3"}
                      </div>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <Link to={"/shop"} className="font-bold border rounded-md p-1 px-4">
              취소
            </Link>
            <button
              type="submit"
              className="font-bold borde rounded-md p-1 px-4 bg-blue-600 text-white"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ItemAddPage;
