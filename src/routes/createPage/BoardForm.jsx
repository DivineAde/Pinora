import { useToast } from "../../components/toast/toast";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

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
          <HugeiconsIcon icon={Cancel01Icon} size={20} />
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
