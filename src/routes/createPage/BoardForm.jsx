import Image from "../../components/image/image";
import { useToast } from "../../components/toast/toast";

const BoardForm = ({ setIsNewBoardOpen, setNewBoard }) => {
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target[0].value.trim();

    if (!title) {
      toast.error("Board needs a name", "Add a title before creating the board.");
      return;
    }

    setNewBoard(title);
    setIsNewBoardOpen(false);
    toast.success("Board added", `${title} will be created with this pin.`);
  };

  return (
    <div className="boardForm">
      <div className="boardFormContainer">
        <div
          className="boardFormClose"
          onClick={() => setIsNewBoardOpen(false)}
        >
          <Image path="/general/cancel.svg" alt="" w={20} h={20} />
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Create a new board</h1>
          <input type="text" placeholder="Board Title" />
          <button>Create</button>
        </form>
      </div>
    </div>
  );
};

export default BoardForm;
