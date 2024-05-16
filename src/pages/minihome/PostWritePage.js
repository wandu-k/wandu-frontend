import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import BoardList from "../../components/miniHome/board/BoardList";
import { useForm } from "react-hook-form";

const PostWritePage = () => {
  const { register, handleSubmit, error } = useForm();
  const cancelWrite = () => {
    console.log("취소");
  };

  return (
    <BoardList>
      {(boards) => (
        <div className="w-full h-full border border-slate-100 shadow-light z-auto backdrop-blur-md bg-white/75 rounded-2xl p-6">
          <form className="flex flex-col h-full justify-between gap-4">
            <div className="flex gap-4 ">
              {boards.map((board) => (
                <button type="button">{board.boardName}</button>
              ))}
            </div>
            <div className="flex">
              <input
                className="w-full"
                placeholder="제목을 입력해 주세요"
                name="title"
                id="title"
                {...register("title", { required: true })}
                required
              ></input>
            </div>
            <ReactQuill
              className="flex flex-col h-full"
              {...register("content", { required: true })}
            ></ReactQuill>
            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={cancelWrite}
                className="border rounded-md p-1 px-4"
              >
                취소
              </button>
              <button className="border border-blue-600 rounded-md p-1 px-4 bg-blue-500 text-white">
                등록
              </button>
            </div>
          </form>
        </div>
      )}
    </BoardList>
  );
};

export default PostWritePage;
